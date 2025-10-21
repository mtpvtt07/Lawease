import express from "express";
import {
  sendOTP,
  verifyOTP,
  verifyOTPLogin,
} from "../controllers/otp.controller.js";

const router = express.Router();

// Public routes
router.post("/send", sendOTP);           // Send OTP
router.post("/verify", verifyOTP);       // Verify OTP & create user
router.post("/login", verifyOTPLogin);   // Verify OTP for login

export default router;
