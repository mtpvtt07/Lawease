# ⚖️ LawEase Backend

Backend API for **LawEase** - a platform designed to make legal information accessible and understandable for everyone, especially rural communities.

## 🌟 Overview

LawEase Backend provides a secure, scalable RESTful API that powers the LawEase platform. Built with Node.js and Express, it handles user authentication via OTP, manages legal resources, and facilitates communication between users and legal professionals.

### Key Highlights
- 🔐 **Secure Authentication** - OTP-based login with JWT tokens
- 📱 **SMS Integration** - Fast2SMS for OTP delivery
- 🗄️ **MongoDB Database** - Efficient data storage with Mongoose ODM
- 🛡️ **Error Handling** - Centralized error management system
- 🏗️ **Modular Architecture** - Clean, maintainable codebase

---

## 📋 Table of Contents
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the Server](#-running-the-server)
- [Folder Breakdown](#-folder-breakdown)
- [Features Implemented](#-features-implemented)
- [Planned Features](#-planned-features)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | ODM for MongoDB |
| **dotenv** | Environment variable management |
| **cors** | Cross-origin resource sharing |
| **nodemon** | Development auto-restart |

---

## 📁 Project Structure

```
backend/
├── public/
├── src/
│ ├── controllers/
│ │ ├── user.controller.js # Email/password user registration, login, and reset
│ │ └── otp.controller.js # OTP send, verify, and login logic
│ ├── db/
│ │ └── index.js # MongoDB connection
│ ├── middleware/
│ │ ├── auth.middleware.js # JWT authentication middleware
│ │ └── user.middleware.js # Optional user validations
│ ├── models/
│ │ ├── user.model.js # User schema
│ │ └── otp.model.js # OTP schema
│ ├── routes/
│ │ ├── user.routes.js # Email/password user routes
│ │ └── otp.routes.js # OTP authentication routes
│ ├── utils/
│ │ ├── ApiErrors.js # Custom error class
│ │ ├── ApiResponse.js # Unified response class
│ │ ├── asyncHandler.js # Async error wrapper
│ │ ├── isValidMobile.js # Mobile number validation helper
│ │ ├── otpGenerator.js # OTP generator utility
│ │ ├── sendSMS.js # Fast2SMS integration
│ │ └── sendEmail.js # Brevo email integration
│ ├── app.js # Express app setup and routes
│ └── index.js # Server entry point
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
FAST2SMS_API_KEY=your_fast2sms_api_key

```

### 3️⃣ Running the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run at: `http://localhost:5000`

---

## 📂 Folder Breakdown

### **controllers/**
Contains business logic and request handlers for API endpoints.
- `user.controller.js` - Handles email/password registration, login, password reset, and code verification.
- `otp.controller.js`  - Handles sending OTP, verifying OTP, and login authentication.

### **db/**
Database connection and configuration.
- `index.js` - MongoDB connection setup

### **middleware/**
Custom middleware for authentication, validation, etc.
- `auth.middleware.js` - Verifies JWT tokens for protected routes.

### **models/**
Mongoose schemas and models.
- `user.model.js` - User schema with email/password, mobile, role, and preferences.
- `otp.model.js` - Defines OTP structure with expiry time.

### **routes/**
API route definitions linked to controllers.
- `user.route.js` - User-related routes
- `otp.routes.js` - All routes related to authentication and OTP flow.

### **utils/**
Reusable helper functions and utilities.
- `otp.routes.js`   - All routes related to authentication and OTP flow.
- `ApiErrors.js`    - Centralized error handling.
- `ApiResponse.js`  - Consistent API response structure.
- `asyncHandler.js` - Wraps async route handlers.
- `isValidMobile.js`- Validates Indian mobile numbers.
- `otpGenerator.js` - Generates random 6-digit OTPs.
- `sendSMS.js`      - Sends OTP messages using Fast2SMS
- `sendEmail.js`    - Sends verification/reset emails via Brevo.
### **app.js**
Express application setup, middleware configuration, and route mounting.

### **index.js**
Server entry point that starts the application.

---

## 🚀 Features Implemented

- ✅ OTP-based user registration
- ✅ OTP login authentication
- ✅ JWT token generation for secure access
- ✅ Error and response handling via utility classes
- ✅ Modular folder structure
- ✅ Auth middleware for protected routes
- ✅ Email/password registration and login
- ✅ Password reset via email verification code

---

## 🔮 Planned Features
- 🔄 Google / Email login integration
- 🔄 Role-based access (User, Lawyer, Admin)
- 🔄 Multi-language support
- 🔄 User and Lawyer profile dashboards
- 🔄 Secure document management
- 🔄 Lawyer–User chat system

## 📝 API Documentation

| Endpoint                        | Method | Description                           |
| ------------------------------- | ------ | ------------------------------------- |
| `/api/v1/otp/send`              | POST   | Send OTP to mobile number             |
| `/api/v1/otp/verify`            | POST   | Verify OTP & create user account      |
| `/api/v1/otp/login`             | POST   | Verify OTP for login                  |
| `/api/v1/user/register`         | POST   | Register user with email & password   |
| `/api/v1/user/login`            | POST   | Login user with email & password      |
| `/api/v1/user/forgot-password`  | POST   | Request password reset code via email |
| `/api/v1/user/verify-reset-code`| POST   | Verify password reset code            |
| `/api/v1/user/reset-password`   | POST   | Reset password using verified code    |
| `/api/v1/protected`             | GET    | Example of protected route using JWT middleware |

---

## 🤝 Contributing

We welcome contributions from everyone! Please follow the standard fork → branch → pull request workflow.

🧩 Contribution Guidelines:

-   For all asynchronous operations, use the predefined asyncHandler() wrapper function for consistent and centralized error handling.
-   When throwing errors, always use the ApiErrors class for better error structure and readability.
-   When sending API responses, use the ApiResponse class to ensure consistency and cleaner code.
-   Follow the modular architecture — avoid repeating logic and keep code reusable across the application.
-   This ensures maintainability, scalability, and consistent behavior throughout the project.

---

## 📄 License
