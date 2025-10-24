// src/utils/asyncHandler.js

// wrapper function to handle async errors in express routes and middlewares 
// usage: Usage: Wrap all controller functions to automatically handle errors.
// usage example: login usr controller 
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import User from "../models/user.model.js";

// export const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) throw new Error("User not found");

//   res.status(200).json(new ApiResponse(200, user, "Login successful"));
// });


const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        const rawStatus = error.statusCode || error.status || error.code || 500;
        const status = (typeof rawStatus === 'number' && rawStatus >= 100 && rawStatus <= 599) ? rawStatus : 500;

        res.status(status).json({
            success: false,
            message: error.message || 'Internal Server Error',
            error: error.stack || error
        });
    }
};

export { asyncHandler };
