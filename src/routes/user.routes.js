

import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer-middleware.js";

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

//export { router };
export default router;