import sys
import requests
from datetime import datetime

# === CONFIG ===
BASE_URL = "https://cost-manager-api-njlh.onrender.com"
OUTPUT_FILE = "test_results.txt"

# === Redirect stdout to output file ===
with open(OUTPUT_FILE, "w", encoding="utf-8") as output:
    sys.stdout = output

    def log_section(title):
        print("\n" + "=" * 60)
        print(f"{title}  |  {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)

    def log_response(label, url, response):
        print(f"🔹 {label}")
        print(f"URL: {url}")
        print(f"Status Code: {response.status_code}")
        try:
            print("JSON:", response.json())
        except Exception:
            print("Text:", response.text)
        print("-" * 60)

    # === Test 1: /api/about ===
    try:
        log_section("Test 1: GET /api/about")
        url = f"{BASE_URL}/api/about"
        res = requests.get(url)
        log_response("Team Info", url, res)
    except Exception as e:
        print("❌ Failed:", e)

    # === Test 2: GET /api/report before adding ===
    try:
        log_section("Test 2: GET /api/report (before adding)")
        url = f"{BASE_URL}/api/report?id=123123&year=2025&month=6"
        res = requests.get(url)
        log_response("Initial Report", url, res)
    except Exception as e:
        print("❌ Failed:", e)

    # === Test 3: POST /api/add ===
    try:
        log_section("Test 3: POST /api/add (adding new cost item)")
        url = f"{BASE_URL}/api/add"
        payload = {
            "userid": 123123,
            "description": "milk auto test",
            "category": "food",
            "sum": 9
        }
        res = requests.post(url, json=payload)
        log_response("Add Cost", url, res)
    except Exception as e:
        print("❌ Failed:", e)

    # === Test 4: GET /api/report after adding ===
    try:
        log_section("Test 4: GET /api/report (after adding)")
        url = f"{BASE_URL}/api/report?id=123123&year=2025&month=6"
        res = requests.get(url)
        log_response("Updated Report", url, res)
    except Exception as e:
        print("❌ Failed:", e)

    # === Test 5: GET /api/users/:id ===
    try:
        log_section("Test 5: GET /api/users/:id")
        url = f"{BASE_URL}/api/users/123123"
        res = requests.get(url)
        log_response("User Info + Total", url, res)
    except Exception as e:
        print("❌ Failed:", e)

    print("\n✅ All tests completed. Results saved to:", OUTPUT_FILE)
