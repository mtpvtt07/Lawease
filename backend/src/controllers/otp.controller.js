import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/otpGenerator.js";
import { isValidMobile } from "../utils/isValidMobile.js";
import { sendOtpFast2SMS } from "../utils/sendSMS.js"; 

// Send OTP to user's mobile number 
export const sendOTP = asyncHandler(async (req, res) => {
    // get the mobile number from request body
    const { mobile } = req.body;

    // validate the mobile number format
    if (!isValidMobile(mobile)) {
        throw new ApiErrors(400, "Invalid mobile number format");
    }

    // check if mobile number is provided if not throw error
    if (!mobile) throw new ApiErrors(400, "Mobile number is required");

    // calling helper function to generate otp
    const otp = generateOTP();
    // remove any existing OTP for the mobile number
    await OTP.deleteMany({ mobile });
    // creating the otp entry in the database with 5 minutes expiry time 
    await OTP.create({ mobile, otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) });
    
    // Try to send OTP via Fast2SMS (optional in development)
    try {
        await sendOtpFast2SMS(mobile, otp);
        console.log(`✅ OTP sent via SMS to ${mobile}: ${otp}`);
    } catch (smsError) {
        // If SMS fails, just log it but don't fail the request
        console.log(`⚠️ SMS sending failed (continuing anyway): ${smsError.message}`);
        console.log(`📱 OTP for ${mobile}: ${otp}`);
    }

    // debug: log the OTP to console (in real application, send via SMS)
    console.log(`🔐 OTP for ${mobile}: ${otp}`);
    // send API response back to client
    return res
    .status(200)
    .json(new ApiResponse
        ( 
            200, 
            null, 
            "OTP sent successfully"
        )
    );
});


// Verify OTP and create a new user account 
export const verifyOTP = asyncHandler(async (req, res) => {
    // extract necessary fields from request body
    const { mobile, fullName, role, preferredLanguage, otp } = req.body;

    // validate the mobile number format
    if (!isValidMobile(mobile)) {
        throw new ApiErrors(400, "Invalid mobile number format");
    }

    // check otp record in the database check if otp is valid and not expired 
    const otpRecord = await OTP.findOne({ mobile });
    if (!otpRecord || otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
        throw new ApiErrors(400, "Invalid or expired OTP");
    }

    // find the user by in database for checking existing user
    let user = await User.findOne({ mobile });

    // if user already exists, throw error
    if (user) ApiErrors(400, "User with this mobile number already exists");

    // if user does not exist, create a new user record 
    user = await User.create({ fullName, mobile, role, preferredLanguage });

    // delete all otp records for the mobile number after successful verification
    await OTP.deleteMany({ mobile });

    // generate JWT token for the authenticated user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // send API response back to client with user details and token 
    res.status(200).json(new ApiResponse(200, { user, token }, "OTP verified successfully"));
});


// Verify OTP for login
export const verifyOTPLogin = asyncHandler(async (req, res) => {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) throw new ApiErrors(400, "Mobile and OTP are required");

    if (!isValidMobile(mobile)) throw new ApiErrors(400, "Invalid mobile number format");

    const otpRecord = await OTP.findOne({ mobile });

    if (!otpRecord || otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
        throw new ApiErrors(400, "Invalid or expired OTP");
    }

    const user = await User.findOne({ mobile });
    
    if (!user) throw new ApiErrors(404, "User not found");

    await OTP.deleteMany({ mobile });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json(new ApiResponse(200, { user, token }, "Login successful"));
});