# RBAC Backend Assignment

A backend application built using **Node.js**, **Express.js**, and **MongoDB** that implements **OTP-based Authentication**, **JWT Authentication**, **Role-Based Access Control (RBAC)**, and **Activity Logging**.

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- dotenv
- Morgan
- Helmet
- CORS

---

# Features

- OTP Login
- JWT Authentication
- Role-Based Access Control (RBAC)
- User Management
- Activity Logs
- OTP Expiry
- One-time OTP Usage
- Maximum 3 Wrong OTP Attempts
- Protected APIs
- Access Denied Logging

---

# Roles

| Role | Permissions |
|------|-------------|
| SUPER_ADMIN | Full Access |
| ADMIN | Manage Users, View Logs |
| MANAGER | View Users |
| USER | View Own Profile |

---

# Project Structure

```
project-root
│
├── src
│   ├── config
│   ├── constants
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── app.js
│
├── .env
├── index.js
├── package.json
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Move inside project

```bash
cd project-folder
```

Install dependencies

```bash
npm install
```

Create a `.env` file.

Example:

```env
PORT=8000

MONGODB_URI=mongodb://localhost:27017/rbac_assignment

JWT_SECRET=your_secret_key
```

Start the server

```bash
npm run dev
```

Server

```
http://localhost:8000
```

---

# Authentication Flow

1. User enters mobile number.
2. System generates a 6-digit OTP.
3. OTP is stored in MongoDB.
4. OTP expires after 1 minute.
5. OTP can only be used once.
6. Maximum 3 wrong attempts are allowed.
7. On successful verification, JWT is generated.
8. User accesses protected APIs using JWT.

---

# API Endpoints

## Authentication

### Send OTP

```
POST /api/auth/send-otp
```

Request

```json
{
    "mobile":"9999999991"
}
```

---

### Verify OTP

```
POST /api/auth/verify-otp
```

Request

```json
{
    "mobile":"9999999991",
    "otp":"123456"
}
```

---

## Users

### Get Profile

```
GET /api/users/profile
```

Permission

```
All Logged In Users
```

---

### Get Users

```
GET /api/users
```

Permission

```
SUPER_ADMIN
ADMIN
MANAGER
```

---

### Create User

```
POST /api/users
```

Permission

```
SUPER_ADMIN
ADMIN
```

---

### Update Role

```
PATCH /api/users/:id/role
```

Permission

```
SUPER_ADMIN
```

---

### Delete User

```
DELETE /api/users/:id
```

Permission

```
SUPER_ADMIN
```

---

## Logs

### Get All Logs

```
GET /api/logs
```

Permission

```
SUPER_ADMIN
ADMIN
```

---

### Get Login Logs

```
GET /api/logs/login
```

Permission

```
SUPER_ADMIN
ADMIN
```

---

# JWT

JWT payload contains

```json
{
    "userId":"...",
    "mobile":"9999999991",
    "role":"SUPER_ADMIN"
}
```

---

# Database Collections

## users

```
_id
name
mobile
role
isActive
createdAt
updatedAt
```

---

## otps

```
_id
mobile
otp
expiresAt
isUsed
attemptCount
createdAt
updatedAt
```

---

## logs

```
_id
userId
mobile
action
status
message
ipAddress
userAgent
createdAt
updatedAt
```

---

# Log Actions

- OTP_GENERATED
- OTP_VERIFIED
- OTP_INVALID
- OTP_EXPIRED
- LOGIN_SUCCESS
- LOGIN_FAILED
- ACCESS_DENIED
- USER_CREATED
- ROLE_UPDATED
- USER_DELETED

---

# Sample Users

| Name | Mobile | Role |
|------|---------|------|
| Super Admin | 9999999991 | SUPER_ADMIN |
| Admin | 9999999992 | ADMIN |
| Manager | 9999999993 | MANAGER |
| User | 9999999994 | USER |

---

# Validation Rules

- Mobile number must contain exactly 10 digits.
- OTP must contain exactly 6 digits.
- OTP expires after 1 minute.
- OTP can only be used once.
- Maximum 3 invalid OTP attempts.
- JWT required for protected APIs.
- Role-based authorization for every protected API.
# RBAC_Backend
