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
````markdown
# ⚖️ LawEase — Backend

Backend API for LawEase. This service provides authentication (OTP), user management, and APIs consumed by the frontend.

## Quick start

Install dependencies

```powershell
cd backend
npm install
```

Create a `.env` file (example values)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lawease
JWT_SECRET=replace_with_secure_secret
FAST2SMS_API_KEY=replace_with_key
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=securepassword
```

Run in development

```powershell
npm run dev
```

Run in production

```powershell
npm start
```

Server will run on http://localhost:5000 by default.

## Project structure (high level)

```
backend/
├── public/                # static files
├── src/
│   ├── controllers/       # request handlers
│   ├── db/                # db connection
│   ├── middleware/        # auth and validation
│   ├── models/            # mongoose models
│   ├── routes/            # express routes
│   └── utils/             # helpers (ApiErrors, ApiResponse, sms/email helpers)
├── package.json
└── README.Md
```

## Environment variables

- `PORT` — server port
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWT tokens
- `FAST2SMS_API_KEY` — (optional) SMS provider key
- SMTP settings for email (optional)

## API (examples)

Common routes (subject to change):

- `POST /api/v1/otp/send` — send OTP
- `POST /api/v1/otp/verify` — verify OTP
- `POST /api/v1/user/register` — register with email/password
- `POST /api/v1/user/login` — login with credentials

Use a tool like Postman to explore the API during development.

## Contributing

Follow the same contributing workflow as the repository: fork → branch → PR. Use the `asyncHandler` and `ApiErrors` utilities for consistent error handling.

## License

This project is licensed under the terms included in the repository. See `LICENSE` if present.
