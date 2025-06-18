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
import cookieParser from "cookie-parser"; // Capital P here (common convention)

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Limit request body size to 16kb (optional, good for security)
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the public folder
app.use(express.static("public"));

// Use cookie parser middleware
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);

// Export app
export { app };
