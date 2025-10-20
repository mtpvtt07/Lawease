# ⚖️ LawEase Backend

Backend API for **LawEase** - a platform designed to make legal information accessible and understandable for everyone, especially rural communities.

---

## 📋 Table of Contents
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the Server](#-running-the-server)
- [Folder Breakdown](#-folder-breakdown)
- [Planned Features](#-planned-features)

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
├── public/                 # Static files
├── src/
│   ├── controllers/        # Business logic & API handlers
│   │   └── user.controller.js
│   ├── db/                 # Database configuration
│   │   └── index.js
│   ├── middleware/         # Custom middleware functions
│   │   └── auth.middleware.js
│   ├── models/             # Database schemas
│   │   └── models.js
│   ├── routes/             # API route definitions
│   │   └── user.route.js
│   ├── utils/              # Helper functions
│   ├── app.js              # Express app configuration
│   └── index.js            # Server entry point
├── .env                    # Environment variables
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
- `user.controller.js` - User-related operations

### **db/**
Database connection and configuration.
- `index.js` - MongoDB connection setup

### **middleware/**
Custom middleware for authentication, validation, etc.
- `user.middleware.js` - User authentication and validation

### **models/**
Mongoose schemas and models.
- `models.js` - Database schema definitions

### **routes/**
API route definitions linked to controllers.
- `user.route.js` - User-related routes

### **utils/**
Reusable helper functions and utilities.

### **app.js**
Express application setup, middleware configuration, and route mounting.

### **index.js**
Server entry point that starts the application.

---

## 🚀 Planned Features

- ✅ User authentication and authorization
- ✅ Role-based access control (User, Lawyer, Admin)
- 🔄 Legal topic categorization and management
- 🔄 Rural-friendly legal help modules
- 🔄 Multi-language support
- 🔄 Document management system

---

## 📝 API Documentation

*Coming soon...*

---

## 🤝 Contributing

Contributions are welcome! Please follow the standard fork-and-pull request workflow.

---

## 📄 License
