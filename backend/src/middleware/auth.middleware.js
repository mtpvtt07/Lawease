import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


// Middleware to verify JWT token and protect routes
export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "").trim();

        if (!token) {
            throw new ApiErrors(401, "You are not authenticated");
        }

        // Verify token using secret key
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by decoded ID
        const user = await User.findById(decodedToken?.id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiErrors(404, "Invalid access token");
        }

        // Attach user to request object
        req.user = user;

        next(); // Continue to next middleware or route handler
    } catch (error) {
        console.error("JWT verification error:", error);
        throw new ApiErrors(401, "Invalid or expired access token");
    }
});
