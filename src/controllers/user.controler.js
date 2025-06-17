import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/apierror.js"
import {user} from "../models/user-model.js"
import {uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiresponse.js";
const registerUser = asyncHandler( async (req,res)=>{
    // get user details from frontend
    //validation-not empty
    //check if user already exists:username,email
    //check for images
    //check for avatar
    //upload them to cloudinary
    //create user object-create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res


    const {fullName,email,username,password}=req.body
    console.log("email:",email)

    if(
        [fullName,email,username,password].some((field)=>field?.trim()==="")
    ) {
         throw new ApiError(400,"all fields are required")
    }

      const existedUser=user.findOne({
        $or:[{username} , {email}]
      }) 
      if(existedUser){
        throw new ApiError(409,"user with email or username already exists" )
      }

      const avataLocalPath=req.files?.avatar[0]?.path;
      const coverImagelocalPath=req.files?.coverImage[0]?.path;

      if(!avataLocalPath){
        throw new ApiError(400,"avatar file is required")
  }
    
    const avatar = await uploadOnCloudinary(avataLocalPath)
    const coverImage=await uploadOnCloudinary(coverImagelocalPath)
      if(!avatar){
         throw new ApiError(400,"avatar file is required")
      }

      const user=await user.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.tolowerCase()
      })

      const createduser = await ServiceWorker.findOneById(user._id).select("-password -refreshToken")
      if(!createduser){
         throw new ApiError(500,"something went wrong while registering the users")
      }
      
      return res.status(201).json(
        new ApiResponse(200,createduser,"user registered successfully")
      )
})


export{
    registerUser

}