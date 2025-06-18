
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