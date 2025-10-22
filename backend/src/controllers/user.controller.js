import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/emailService.js";


/* ----------------------------- Helper Functions ----------------------------- */
// Generate JWT Token for Authentication which store in browser cookies 
const generateToken = (userId) => {
    return jwt.sign(
        {
            id: userId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};


/* ------------------------------ User Register ------------------------------- */
export const registerUser = asyncHandler(async (req, res) => {
    // getting the fields from request body 
    const { fullName, email, password, role, preferredLanguage } = req.body;

    // check if all required fields are provided
    if (!fullName || !email || !password || !role) {
        throw new ApiErrors(400, "All required fields must be provided");
    }

    // check if user already exists with the given email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiErrors(400, "User already exists with this email");
    }

    // create new user document in the database
    const user = await User.create({
        fullName,
        email,
        password,
        role,
        preferredLanguage,
    });

    // generate JWT token for the newly registered user
    const token = generateToken(user._id);

    // send success code
    res
        .status(201)
        .json(new ApiResponse(201, { user, token }, "User registered successfully"));
});



/* ---------------------------------- Login ----------------------------------- */
export const loginUser = asyncHandler(async (req, res) => {
    // getting the fields from request body
    const { email, password } = req.body;

    // validate the input fields
    if (!email || !password) {
        throw new ApiErrors(400, "Email and password are required");
    }

    // find user by email 
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiErrors(401, "Invalid credentials");
    }

    // compare the provided password with the stored hashed password
    const isMatch = await user.matchPassword(password);
    // if password does not match, throw error
    if (!isMatch) {
        throw new ApiErrors(401, "Invalid credentials");
    }

    // generate JWT token for the logged in user
    const token = generateToken(user._id);
    // send success code for login
    res
        .status(200)
        .json(new ApiResponse(200, { user, token }, "Login successful"));
});


/* ------------------------------ Forgot Password ----------------------------- */
export const forgotPassword = asyncHandler(async (req, res) => {
    // getting the fields from request body
    const { email } = req.body;

    // check if email is provided
    if (!email) {
        throw new ApiErrors(400, "Email is required");
    }

    // check if user exists with the given email in the database
    const user = await User.findOne({ email });
    // if no user found, throw error
    if (!user) {
        throw new ApiErrors(404, "No user found with this email");
    }

    // Generate 6-digit reset code
    const resetCode = crypto.randomInt(100000, 999999).toString();
    // Set expiration time for the reset code (10 minutes from now)
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save reset code and expiration to user document
    user.resetPasswordCode = resetCode;
    // Save expiration time
    user.resetCodeExpires = expires;
    // Save the updated user document
    await user.save();

    // Send reset code via email with HTML content 
    const htmlContent = `<h2>Password Reset Verification</h2>
    <p>
         Your verification code is: 
         <b>
             ${resetCode}
         </b>
    </p>
    <p>
    This code will expire in 10 minutes.
    </p>`;

    // Send the email via utils/emailService.js 
    await sendEmail(user.email, "LawEase Password Reset Code", htmlContent);

    // send success after sending the email to user 
    res
        .status(200)
        .json(new ApiResponse(200, {}, "Verification code sent successfully"));
});


/* ------------------------------- Verify Code -------------------------------- */
export const verifyResetCode = asyncHandler(async (req, res) => {
    // getting the fields from request body
    const { email, code } = req.body;

    // validate the input fields  
    if (!email || !code) {
        throw new ApiErrors(400, "Email and verification code are required");
    }

    // find user by email 
    const user = await User.findOne({ email });
    // if no user found, throw error
    if (!user) {
        throw new ApiErrors(404, "User not found");
    }

    // check if the provided code matches and is not expired 
    if (user.resetPasswordCode !== code || !user.resetCodeExpires || user.resetCodeExpires < Date.now()) {
        throw new ApiErrors(400, "Invalid or expired verification code");
    }

    // if all good, send success response yup code matched 
    res
        .status(200)
        .json(new ApiResponse(200, {}, "Code verified successfully"));
});


/* ------------------------------- Reset Password ----------------------------- */
export const resetPassword = asyncHandler(async (req, res) => {
    // getting the fields from request body
    const { email, code, newPassword } = req.body;

    // validate the input fields
    if (!email || !code || !newPassword) {
        throw new ApiErrors(400, "All fields are required");
    }

    // find use by email in database 
    const user = await User.findOne({ email });
    // if user is not found return an error that user doent exit so password cant be
    // reset
    if (!user) {
        throw new ApiErrors(404, "User not found");
    }

    // best practice to check if the code matches and is not expired her 
    // as well since user can open multiple reset password requests try to guess 
    // the code or try brute force attack that why checking again here is important
    if (
        user.resetPasswordCode !== code ||
        user.resetCodeExpires < Date.now()
    ) {
        throw new ApiErrors(400, "Invalid or expired verification code");
    }

    // all good update the user password and clear the reset code fields
    user.password = newPassword;
    user.resetPasswordCode = null;
    user.resetCodeExpires = null;
    // save the updated user document
    await user.save();

    // yup send success response
    res
        .status(200)
        .json(new ApiResponse(200, {}, "Password reset successfully"));
});