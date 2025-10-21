// src/utils/ApiResponse.js
// use to handle api responses in a structured way by providing status codes, data and messages

// how to use: return new ApiResponse(200, { userId: 1 }, "User created successfully") 
// res.status(200).json(new ApiResponse(200, user, "User logged in successfully"));

class ApiResponse {
  constructor(statusCode, data = null, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
