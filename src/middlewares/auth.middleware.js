/*
import { User } from "../models/user-model.js";
import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken"



export const verifyJWT = asyncHandler(async(req,_,next)=>{
  
  
   try{
    const token =req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

    if(!token){
        throw new ApiError(401,"Unauthorized request")
    }

    const decordedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decordedToken?._id).select("-password -refreshToken")

    if(!user){
        throw new ApiError(401,"Invalid Access Token")
    }
   
    req.user =user;
    next()
}catch(error){
   throw new ApiError(401,error?.message || "Invalid access token")
}
})
*/


import { User } from "../models/user-model.js";
import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // Try to get token from cookie or Authorization header (Bearer token)
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Verify token with secret key
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find user by id in decoded token, exclude sensitive fields
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    // Attach user object to request for downstream handlers
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
