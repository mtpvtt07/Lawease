// use to generate a 6 digit otp for otp based authentication
// src/utils/otpGenerator.js

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};
