import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// create and intialize app 
const app = express();

// Middleware to parse JSON request bodies
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true})); 
app.use(cookieParser()); 


// import all routes her
import otpRoutes from './routes/otp.routes.js';
// import the user routes
import userRoutes from './routes/user.routes.js';

// Home route for health check
app.get('/', (req, res) => {
    res
    .status(200)
    .json(
        { 
            status: 'OK', 
            message: 'LawEase API is running' 
        }
    );
});

// use otp routes here
app.use('/api/v1/otp', otpRoutes); 
// api routes will be http://<domain>/api/v1/otp/sendOTP
// api routes will be http://<domain>/api/v1/otp/verifyOTP
// api routes will be http://<domain>/api/v1/otp/verifyOTPLogin

// use user routes here
app.use('/api/v1/users', userRoutes); 
// api routes will be http://<domain>/api/v1/users/register
// api routes will be http://<domain>/api/v1/users/login
// api routes will be http://<domain>/api/v1/users/forgot-password
// api routes will be http://<domain>/api/v1/users/verify-reset-code
// api routes will be http://<domain>/api/v1/users/reset-password


export default app;
