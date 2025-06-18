/*
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { User } from "../models/user-model.js";

// -------------------- Register User --------------------
const registerUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password, avatar, coverImage } = req.body;

    // Validation: all fields except coverImage are required (avatar is required too)
    if (!fullname || !username || !email || !password ||!avatar  )
    {
        throw new ApiError(400, "All fields including avatar are required");
    }

    // Check if user already exists by email or username
    const existingUser = await User.findOne({
        $or: [{ email }, { username: username.toLowerCase() }]
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists with given email or username");
    }

    // Create new user
    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar,               // expecting avatar as a URL or string here
        coverImage: coverImage || "" // optional coverImage
    });

    return res.status(201).json(
        new ApiResponse(201, {
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            coverImage: user.coverImage
        }, "User registered successfully")
    );
});

// -------------------- Login User --------------------
const loginUser = asyncHandler(async (req, res) => {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
        throw new ApiError(400, "Email/Username and password are required");
    }

    // Find user by email or username
    const user = await User.findOne({
        $or: [
            { email: emailOrUsername },
            { username: emailOrUsername.toLowerCase() }
        ]
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Validate password
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refresh token to user document
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json(
        new ApiResponse(200, {
            accessToken,
            user: {
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                coverImage: user.coverImage
            }
        }, "Login successful")
    );
});

export { registerUser, loginUser };
*/
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { User } from "../models/user-model.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body;
    console.log("email",email);
    const avatarFile = req.files?.avatar?.[0];
    const coverImageFile = req.files?.coverImage?.[0];

    // ✅ Validate input
    if (!fullname || !username || !email || !password || !avatarFile) {
        throw new ApiError(400, "All fields including avatar are required");
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists with given email or username");
    }
    //console.log(req.files);

    // ✅ Create user
    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
        avatar: `/temp/${avatarFile.filename}`,
        coverImage: coverImageFile ? `/temp/${coverImageFile.filename}` : ""
    });

    return res.status(201).json(
        new ApiResponse(201, {
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            coverImage: user.coverImage
        }, "User registered successfully")
    );
});

export { registerUser };


/* classic way
   let coverImagelocalpath;
   if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
   coverImagelocalpath = req.files.coverImage[0].path
   }
*/