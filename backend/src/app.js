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


export default app;
