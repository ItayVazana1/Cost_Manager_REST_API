
# 💸 Cost Manager REST API

A RESTful backend service to manage user expenses, built with **Node.js**, **Express**, and **MongoDB Atlas**.  
This system was developed as a **final project** for the academic course  
🎓 *Asynchronous Server-Side Programming*, part of the **B.Sc. in Computer Science** degree.

🌐 **Live Deployment**:  
🔗 [https://cost-manager-api-njlh.onrender.com](https://cost-manager-api-njlh.onrender.com)

---

## 📂 Project Structure

```
📁 Cost_Manager_REST_API
├── app.js                        # Express app initialization
├── server.js                    # Server entry point (listens to PORT)
├── .env.example                 # Template for environment variables
├── config/
│   └── db.js                    # MongoDB connection logic
├── controllers/                # Business logic for each endpoint
│   ├── aboutController.js
│   ├── costController.js
│   ├── reportController.js
│   └── userController.js
├── models/                     # Mongoose schemas
│   ├── Cost.js
│   └── User.js
├── routes/                     # Route definitions
│   ├── aboutRoutes.js
│   ├── costRoutes.js
│   ├── reportRoutes.js
│   └── userRoutes.js
├── utils/
│   └── validate.js             # Input validation logic
├── scripts/
│   └── resetForTesting.js     # DB reset script (for testing only)
├── __tests__/                 # Jest + Supertest tests per endpoint
│   ├── about.test.js
│   ├── add.test.js
│   ├── report.test.js
│   └── user.test.js
├── local_test_runner.py       # Full test runner (API + structure)
├── package.json               # Project metadata and dependencies
├── README.md                  # This file 😊
```

---

## 🚀 API Endpoints Overview

### 🔸 POST `/api/add` → Add New Cost

Adds a new cost entry for a user.  
If no `date` is provided, the server uses the current timestamp.

#### ✅ Example Request:
```json
{
  "userid": 123123,
  "description": "milk",
  "category": "food",
  "sum": 10
}
```

#### 🟢 Example Success Response:
```json
{
  "_id": "abc123...",
  "userid": 123123,
  "description": "milk",
  "category": "food",
  "sum": 10,
  "date": "2025-06-01T12:30:00.000Z"
}
```

#### 🔴 Example Error (invalid category):
```json
{
  "error": "category must be one of the predefined categories"
}
```

---

### 🔸 GET `/api/report?id=123123&year=2025&month=6` → Monthly Report

Returns all costs for a specific user in a specific month, grouped by category.  
Each cost includes: `sum`, `description`, and `day`.

#### 🟢 Example Response:
```json
{
  "userid": 123123,
  "year": 2025,
  "month": 6,
  "costs": [
    {
      "food": [
        { "sum": 10, "description": "milk", "day": 1 },
        { "sum": 8, "description": "bread", "day": 3 }
      ]
    },
    { "health": [] },
    { "housing": [] },
    { "sport": [] },
    { "education": [] }
  ]
}
```

#### 🔴 Error (missing params):
```json
{
  "error": "id, year, and month must be numbers"
}
```

---

### 🔸 GET `/api/users/123123` → Get User Info

Returns the personal info and total cost of a specific user.

#### 🟢 Example Response:
```json
{
  "id": 123123,
  "first_name": "mosh",
  "last_name": "israeli",
  "total": 18
}
```

#### 🔴 Error (user not found):
```json
{
  "error": "User not found"
}
```

---

### 🔸 GET `/api/about` → Project Team Info

Returns a list of team members.  
The structure must **only include** `first_name` and `last_name` fields.

#### 🟢 Example Response:
```json
[
  { "first_name": "Itay", "last_name": "Vazana" },
  { "first_name": "Arthur", "last_name": "Blitsman" }
]
```

---

## 🧠 System Flow

1. Client sends requests to `/api/...`
2. Express routes forward to dedicated controllers.
3. Validation runs via `utils/validate.js`
4. If valid → MongoDB stores data using `Cost` / `User` models
5. For `/api/report` → groupBy category using `computed pattern`

---

## 📚 Documentation (JSDoc)

All code is documented using [JSDoc](https://jsdoc.app/).

### ✔️ Each file includes:
- `@file`, `@project`, `@description`
- Function-level `@param`, `@returns`
- Clear inline descriptions

---

## 🧪 Testing Setup

The project includes full coverage of all endpoints using **Jest** + **Supertest**.

| Test File | Coverage |
|-----------|----------|
| `add.test.js` | `/api/add` |
| `report.test.js` | `/api/report` |
| `user.test.js` | `/api/users/:id` |
| `about.test.js` | `/api/about` |

### 🛠 Additional Tools:
- `resetForTesting.js` – Resets DB to contain only one mock user (id `123123`)
- `local_test_runner.py` – Validates endpoints, scoring, structure, and DB contents

---

## 🌍 Deployment Notes

- 🌐 Hosted on [Render.com](https://render.com)
- Auto-deploy on every GitHub commit
- MongoDB Atlas allows access from all IPs (`0.0.0.0/0`)
- All sensitive keys set via **Environment Variables**

```env
MONGODB_URI=your-mongo-uri
PORT=3000
```

`.env.example` is included — never commit `.env`

---

## 👨‍💻 Team

```json
[
  { "first_name": "Itay", "last_name": "Vazana" },
  { "first_name": "Arthur", "last_name": "Blitsman" }
]
```

---

## 📹 Demo Video

🎥 [YouTube (Unlisted)](https://your-video-link-here)  
*Link will be added before submission*

---

🧠 Designed with structure, clarity, and documentation in mind.  
Tested thoroughly. Delivered with confidence.
