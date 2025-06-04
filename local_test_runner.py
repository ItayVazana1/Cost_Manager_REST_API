import os
import re
import json
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
from glob import glob
import sys

# --- Redirect output to file as well as console ---
log_file = open("validation_log.txt", "w", encoding="utf-8")

class DualWriter:
    def write(self, msg):
        sys.__stdout__.write(msg)
        log_file.write(msg)
    def flush(self): pass

sys.stdout = DualWriter()

# --- Load environment variables ---
load_dotenv()
MONGO_URI = os.getenv("MONGODB_URI")
BASE_URL = "http://localhost:3000"

# --- Setup ---
MAX_SCORE = 100
SEPARATOR = "─" * 70

# --- Scoring Adjustment ---
class ScoreTracker:
    def __init__(self, max_score):
        self.max_score = max_score
        self.raw_score = 0
        self.logs = []

    def add(self, success, message, weight):
        earned = weight if success else 0
        self.raw_score += earned
        self.logs.append((message, earned, weight))
        return earned

    def print_summary(self):
        print("\n📋 CHECKLIST SUMMARY:\n")
        for message, earned, weight in self.logs:
            check = "✅" if earned == weight else ("⚠️" if earned > 0 else "❌")
            print(f"{check} {message} ({earned}/{weight})")

    def final_score(self):
        final = min(self.raw_score, self.max_score)
        if self.raw_score > self.max_score:
            print(f"\n⚠️ Score capped at {self.max_score}, raw score was {self.raw_score}")
        print(f"\n✅ FINAL SCORE: {final} / {self.max_score}")
        return final

score_tracker = ScoreTracker(MAX_SCORE)

# --- Result Formatter ---
def print_result(success, msg, points, response=None):
    earned = score_tracker.add(success, msg, points)
    print(f"\n{SEPARATOR}")
    if success:
        print(f"✅ {msg}\n🎯 +{earned} points")
    else:
        print(f"❌ {msg}\n💛 +0 points")
    if response is not None:
        print("📆 Response:")
        print(json.dumps(response, indent=4, ensure_ascii=False, default=str))
    print(SEPARATOR)

# --- API TESTS ---
def test_api():
    print("\n🧪 Running Functional API Tests...")
    api_tests = [
        {"name": "/api/about returns only first_name and last_name", "weight": 10, "test": _check_about},
        {"name": "/api/about does not include extra fields", "weight": 3, "test": _check_about_no_extra_fields},
        {"name": "/api/report returns valid empty report with all required categories", "weight": 7, "test": _check_empty_report},
        {"name": "/api/add accepts valid cost and returns it", "weight": 7, "test": _check_add_cost},
        {"name": "/api/add returns 400 on missing userid", "weight": 7, "test": _check_missing_user},
        {"name": "/api/add returns 400 on invalid category", "weight": 7, "test": _check_invalid_category},
        {"name": "/api/users/:id returns correct user info", "weight": 7, "test": _check_user_info},
        {"name": "/api/users/:id does not include extra user fields", "weight": 3, "test": _check_user_info_fields},
        {"name": "/api/users/:id returns 404 on missing user", "weight": 3, "test": _check_user_404},
        {"name": "/api/report includes new item after add", "weight": 9, "test": _check_filled_report},
        {"name": "/api/add returns 400 on invalid date format", "weight": 5, "test": _check_invalid_date_format},
        {"name": "/api/add returns 400 on negative sum", "weight": 5, "test": _check_negative_sum},
        {"name": "/api/add returns 400 on empty description", "weight": 5, "test": _check_empty_description}
    ]
    for item in api_tests:
        try:
            success, response = item["test"]()
            print_result(success, item["name"], item["weight"], response)
        except Exception as e:
            print_result(False, f"{item['name']} threw an exception: {e}", 0)

# --- API Test Helpers ---
def _check_about():
    res = requests.get(f"{BASE_URL}/api/about")
    data = res.json()
    valid = res.status_code == 200 and isinstance(data, list) and all(set(member.keys()) == {"first_name", "last_name"} for member in data)
    return valid, data

def _check_about_no_extra_fields():
    res = requests.get(f"{BASE_URL}/api/about")
    data = res.json()
    valid = all(len(member.keys()) == 2 for member in data)
    return valid, data

def _check_empty_report():
    res = requests.get(f"{BASE_URL}/api/report", params={"id": 123123, "year": 2025, "month": 6})
    data = res.json()
    expected = ['food', 'health', 'housing', 'sport', 'education']
    got = [list(cat.keys())[0] for cat in data.get("costs", [])]
    return res.status_code == 200 and sorted(expected) == sorted(got), data

def _check_add_cost():
    res = requests.post(f"{BASE_URL}/api/add", json={"userid": 123123, "description": "milk test", "category": "food", "sum": 7, "date": "2025-06-15"})
    data = res.json()
    return res.status_code == 201 and data.get("description") == "milk test", data

def _check_missing_user():
    res = requests.post(f"{BASE_URL}/api/add", json={"description": "no user", "category": "food", "sum": 10})
    return res.status_code == 400 and "error" in res.json(), res.json()

def _check_invalid_category():
    res = requests.post(f"{BASE_URL}/api/add", json={"userid": 123123, "description": "bad", "category": "invalid", "sum": 10})
    return res.status_code == 400 and "error" in res.json(), res.json()

def _check_user_info():
    res = requests.get(f"{BASE_URL}/api/users/123123")
    data = res.json()
    return res.status_code == 200 and set(data.keys()) == {"id", "first_name", "last_name", "total"}, data

def _check_user_info_fields():
    res = requests.get(f"{BASE_URL}/api/users/123123")
    return len(res.json().keys()) == 4, res.json()

def _check_user_404():
    res = requests.get(f"{BASE_URL}/api/users/999999")
    return res.status_code == 404 and "error" in res.json(), res.json()

def _check_filled_report():
    res = requests.get(f"{BASE_URL}/api/report", params={"id": 123123, "year": 2025, "month": 6})
    data = res.json()
    found = any("food" in cat and any(item["description"] == "milk test" for item in cat["food"]) for cat in data["costs"])
    return found, data

def _check_invalid_date_format():
    res = requests.post(f"{BASE_URL}/api/add", json={"userid": 123123, "description": "bad date", "category": "food", "sum": 10, "date": "15-06-2025"})
    return res.status_code == 400 and "error" in res.json(), res.json()

def _check_negative_sum():
    res = requests.post(f"{BASE_URL}/api/add", json={"userid": 123123, "description": "neg", "category": "food", "sum": -5})
    return res.status_code == 400 and "error" in res.json(), res.json()

def _check_empty_description():
    res = requests.post(f"{BASE_URL}/api/add", json={"userid": 123123, "description": "", "category": "food", "sum": 5})
    return res.status_code == 400 and "error" in res.json(), res.json()

# --- Structure & Code Checks ---
def test_structure_and_code():
    print("\n🧱 Running Structure & Code Checks...")
    checks = [
        ("Project has required folders & files", 3, _check_structure),
        ("Each controller is in a separate file", 2, _check_controllers_split),
        ("Each endpoint has a matching test file", 2, _check_matching_tests),
        ("Each JS file starts with proper JSDoc header", 3, _check_jsdoc_comments),
        ("No use of 'var' in any JS file", 2, _check_no_var_usage),
        ("README includes team info and YouTube link", 2, _check_readme_basics)
    ]
    for name, weight, func in checks:
        try:
            result = func()
            print_result(result, name, weight)
        except Exception as e:
            print_result(False, f"{name} threw an exception: {{e}}", 0)


def _check_structure():
    required = [
        "app.js", "server.js", ".env", ".env.example", "package.json", "package-lock.json",
        "config/db.js", "controllers/aboutController.js", "controllers/costController.js",
        "controllers/reportController.js", "controllers/userController.js",
        "models/User.js", "models/Cost.js", "routes/aboutRoutes.js", "routes/costRoutes.js",
        "routes/reportRoutes.js", "routes/userRoutes.js", "utils/validate.js",
        "__tests__/about.test.js", "__tests__/add.test.js", "__tests__/report.test.js", "__tests__/user.test.js",
        "README.md", "project_structure.txt"
    ]
    return all(os.path.exists(path) for path in required)

def _check_controllers_split():
    files = ["aboutController.js", "costController.js", "userController.js", "reportController.js"]
    return all(os.path.exists(os.path.join("controllers", f)) for f in files)

def _check_matching_tests():
    test_files = ["about.test.js", "add.test.js", "report.test.js", "user.test.js"]
    return all(os.path.exists(os.path.join("__tests__", tf)) for tf in test_files)

def _check_jsdoc_comments():
    js_files = [f for f in glob("**/*.js", recursive=True) if "node_modules" not in f]
    for f in js_files:
        with open(f, encoding="utf-8") as file:
            content = file.read().strip()
            if not content.startswith("/**") or "@file" not in content.split("*/")[0]:
                return False
    return True

def _check_no_var_usage():
    js_files = [f for f in glob("**/*.js", recursive=True) if "node_modules" not in f]
    return all("var " not in open(f, encoding="utf-8").read() for f in js_files)

def _check_readme_basics():
    if not os.path.exists("README.md"):
        return False
    content = open("README.md", encoding="utf-8").read().lower()
    return "itay" in content and "arthur" in content

# --- MongoDB Content Checks ---
def test_mongodb_content():
    print("\n🗄️ Running MongoDB Content Tests...")
    try:
        client = MongoClient(MONGO_URI)
        db = client.get_database()
        users = list(db.users.find())
        costs = list(db.costs.find())
        user_ok = any(u["id"] == 123123 and u["first_name"] == "mosh" for u in users)
        has_all = all(any(c["category"] == cat for c in costs) for cat in ['food', 'health', 'housing', 'sport', 'education'])
        print_result(user_ok, "Contains mock user with ID 123123", 4)
        print_result(has_all, "Contains at least one cost per required category", 4)
    except Exception as e:
        print_result(False, f"MongoDB test threw error: {e}", 0)

# --- Insert & Cleanup Utilities ---
def add_sample_costs_for_all_categories():
    print("\n🧪 Adding one cost per required category...")
    for cat in ['food', 'health', 'housing', 'sport', 'education']:
        try:
            res = requests.post(f"{BASE_URL}/api/add", json={
                "userid": 123123,
                "description": f"test {cat}",
                "category": cat,
                "sum": 10
            })
            if res.status_code == 201:
                print(f"✅ Added {cat}")
            else:
                print(f"❌ Failed to add {cat}: {res.json()}")
        except Exception as e:
            print(f"❌ Exception while adding {cat}: {e}")

def cleanup_test_costs():
    print("\n🗑️ Cleaning up inserted test costs...")
    try:
        client = MongoClient(MONGO_URI)
        db = client.get_database()
        deleted = db.costs.delete_many({"userid": 123123, "description": {"$regex": "^test "}})
        print(f"🧹 Deleted {deleted.deleted_count} test cost items.")
    except Exception as e:
        print(f"❌ Failed to clean up test costs: {e}")

# --- MAIN ---
if __name__ == "__main__":
    test_api()
    test_structure_and_code()
    add_sample_costs_for_all_categories()
    test_mongodb_content()
    cleanup_test_costs()
    score_tracker.print_summary()
    score_tracker.final_score()
    print("📄 All results logged to: validation_log.txt")
