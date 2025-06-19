
import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";
import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asynchandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Extract token from cookie or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request: Token not found");
    }

    // Verify the token using secret key
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Fetch the user by decoded _id and exclude sensitive fields
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Unauthorized request: User not found");
    }

    // Attach user object to request
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Unauthorized request");
  }
});
