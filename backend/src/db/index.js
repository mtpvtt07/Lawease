// used for database connection and initialization 
// connects to MongoDB using mongoose 
import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log(`\n mongodb connected DB host : ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MONGODB connection FAILED :", error);
        process.exit(1); //or throw error 

    }
}

export default connectDB