
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { User } from "../models/user-model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;
  console.log("email:", email);

  const avatarFile = req.files?.avatar?.[0];
  const coverImageFile = req.files?.coverImage?.[0];

  // Validate input
  if (!fullname || !username || !email || !password || !avatarFile) {
    throw new ApiError(400, "All fields including avatar are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists with given email or username")
  }

  // Create user
  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    password,
    avatar: `/temp/${avatarFile.filename}`,
    coverImage: coverImageFile ? `/temp/${coverImageFile.filename}` : "",
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        coverImage: user.coverImage,
      },
      "User registered successfully"
    )
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required")
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist")
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid user credentials")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true, // set to false if testing on localhost without HTTPS
    sameSite: "strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const LogOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true, // same note as above for localhost
    sameSite: "strict",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const incomingrefreshToken = asyncHandler(async(req,res)=>{
  req.cookies.refreshToken || req.body.refreshToken

  if(!incomingrefreshToken){
   throw new ApiError (401,"unauthorized request")
  }
try{
  const decodedToken = jwt.verify(
    incomingrefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  )

  const user = await User.findById(decodedToken?._id)

  

  if (!user) {
    throw new ApiError(401, "invalid refresh token")
  }

  if(incomingrefreshToken!== user?.refreshToken){
    throw new ApiError(401, "refresh token is expired ur used")
  }

  const options= {
    httpOnly:true,
    secure:true
  }
 const {accessToken,newrefreshToken } = await generateAccessAndRefreshTokens(user._id)

 return res.status(200)
 .cookie("accessToken",accessToken,options)
 .cookie("refreshToken",new refreshToken,options)
 .json(
  new   ApiResponse(
    200,
    {accessToken,refreshToken:newrefreshToken},"Access token refreshed"
  )
 )
}catch(error){
  throw new ApiError(401,error?.message ||  "Invalid refresh token")
}
})

export { registerUser, loginUser, LogOutUser,refreshAccessToken };












