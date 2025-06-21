
import { Router } from "express";
import express from "express";
export { registerUser, loginUser, LogOutUser,generateAccessAndRefreshTokens };
import {changeCurrentPassword,
        getCurrentUser,
        generateAccessAndRefreshTokens,
        getUserChannelProfile,
        loginUser, 
        LogOutUser,
        registerUser,
        updateAccountDetails, 
        updateUserAvatar,
        updateUserCoverImage ,
       getWatchHistory, } 
from "../controllers/user.controller.js";
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

router.route("/refresh-token").post(generateAccessAndRefreshTokens)

router.route("/change-password").post(verifyJWT,changeCurrentPassword)

router.route("/current-user").get(verifyJWT,getCurrentUser)

router.route("/update-account").patch(verifyJWT,updateAccountDetails)

router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)

router.route("/Cover-Image").patch(verifyJWT,upload.single("/CoverImage"),updateUserCoverImage)

router.route("/c/:username").get(verifyJWT,getUserChannelProfile)  //taken from params thaat is y it looks different

router.route("/WatchHistory").get(verifyJWT,getWatchHistory)

//export { router };
export default router;