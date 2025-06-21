//express
/*
import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"})) 
app.use(express.static("public"))
app.use(cookieparser())


//routes import

import userRouter from './routes/user.routes.js'


//routes declaration
app.use("/api/v1/users",userRouter)

//http://localhost:8000/api/v1/user/register
export { app }
*/

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();

// ✅ 1. CORS middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// ✅ 2. Body parsers (important!)
app.use(express.json()); // <-- PLACE THIS HERE (Line 12)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// ✅ 3. Static files
app.use(express.static("public"));

// ✅ 4. Cookie parser
app.use(cookieParser());

// ✅ 5. Routes
app.use("/api/v1/users", userRouter);

// ✅ Export app
export { app };
