
// your routes h
/*
import { DB_NAME } from "../constants.js"; // Corrected path
import userRoutes from "../routes/user.routes.js"; // Corrected path
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 8000;

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: DB_NAME
        });
        console.log(`✅ MongoDB connected!`);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

// Middleware
app.use(express.json());
app.use("/api/v1/users", userRoutes); // Register routes

// Start Server after connecting DB
connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running at port ${PORT}`));
});

export default connectDB;
*/

import { DB_NAME } from "../constants.js";
import userRoutes from "../routes/user.routes.js";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
const PORT = 8000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: DB_NAME,
    });
    console.log(`✅ MongoDB connected!`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// Middleware

// CORS - allow your frontend origin and cookies
app.use(
  cors({
    origin: "http://localhost:3000", // <-- change this to your frontend URL if different
    credentials: true,
  })
);

// Body parsers
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// For parsing cookies
app.use(cookieParser());

// For handling file uploads (avatar, coverImage, etc.)
app.use(
  fileUpload({
    useTempFiles: true, // optional, based on your usage
    tempFileDir: "/tmp/",
  })
);

// Register user routes
app.use("/api/v1/users", userRoutes);

// Start Server after connecting DB
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running at port ${PORT}`));
});

export default connectDB;
