import dotenv from 'dotenv';
import connectDB from './db/index.js';
import app from './app.js';
// Load environment variables from .env file
dotenv.config();


// Database Connection 
connectDB()

// chain  .then with the connectDB to ensure server starts after DB connection 
.then(() => {

  console.log("mongodb connection successfull");
  
  // Start the server on the specified PORT or default to 8000
  app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running on port :" ${process.env.PORT}`);
  });

})
.catch((e) =>{
  console.log("mongodb connection failed", e);
})

