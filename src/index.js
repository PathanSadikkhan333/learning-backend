/*
//require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
//import { router as userRoutes } from "../routes/user.routes.js";

import userRoutes from "./routes/user.routes.js"; // ✅ CORRECT



// Load environment variables
dotenv.config({ path: "./.env" });

// Connect to MongoDB and start the server
const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running at port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1); // Exit process on failure
    }
};

startServer();
*/


import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
//import userRoutes from "./routes/user.routes.js"; // ✅ Correct import

// Load environment variables
dotenv.config({ path: "./.env" });

// Register user routes middleware
//    app.use("/api/v1/users", userRoutes);

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit process on failure
  }
};

startServer();


/* 2nd approuch
import express from "express"
const app = express()

( async()=>{
  try{
    mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error",(error)=>{
        console.log("ERROR:",error);
        throw error
    })
   app.listen(process.env.PORT,() => {
    console.log(`app is listening on port ${process.env.PORT}`);
   })

  }
  catch(error){
    console.error("ERROR:",error)
    throw err
  }
})()
  */