import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendOtpFast2SMS = async (mobile, otp) => {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: `Your LawEase verification OTP is ${otp}. It will expire in 5 minutes.`,
        language: "english",
        flash: 0,
        numbers: mobile
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.data.return) {
      throw new Error("Failed to send OTP");
    }

    console.log(`✅ OTP sent to ${mobile}`);
    return true;
  } catch (err) {
    console.error("Fast2SMS error:", err.message);
    throw new Error("Unable to send OTP");
  }
};
