
import { Router } from "express";
import express from "express";
export { registerUser, loginUser, LogOutUser,refreshAccessToken };
import {loginUser, LogOutUser, registerUser , } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer-middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User route working");
});

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser)
//secured routes
router.route("/logout").post(verifyJWT, LogOutUser)
router.route("/refresh-token").post(refreshAccessToken)
//export { router };
export default router;