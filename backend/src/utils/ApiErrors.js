// src/utils/ApiErrors.js
// use to handle api errors in a structured way by providing error messages and status codes 

// how to use: throw new ApiErrors(404, "User not found") 
// or next(new ApiErrors(400, "Invalid input", [{ field: "email", message: "Email is required" }]))
class ApiErrors extends Error {
    constructor(
        statusCode,
        message = 'Something went wrong',
        errors = [],
        stack = ""
    ) {
        super(message);

        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiErrors };
