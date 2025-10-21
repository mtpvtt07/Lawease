import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
