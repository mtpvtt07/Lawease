import express from "express";
import {
    registerUser,
    loginUser,
    requestPasswordReset,
    verifyResetCode,
    resetPassword
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// ---------------------------
// Public routes
// ---------------------------

// Register a new user (email & password)
router.post("/register", registerUser);

// Login with email & password
router.post("/login", loginUser);

// Request password reset (send verification code to email)
router.post("/forgot-password", requestPasswordReset);

// Verify the code sent to email
router.post("/verify-reset-code", verifyResetCode);

// Reset password using verified code
router.post("/reset-password", resetPassword);

// ---------------------------
// Protected routes
// ---------------------------

// Example: Get user profile (JWT required)
router.get("/profile", verifyJWT, (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
        message: "User profile fetched successfully"
    });
});

export default router;
