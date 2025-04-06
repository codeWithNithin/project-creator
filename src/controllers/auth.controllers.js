import asyncHandler from "../utils/async-handler.js";
import User from '../models/user.models.js'
import ApiError from "../utils/api-errors.js";
import { emailVerificationMailGenContent, sendEmail } from "../utils/email.utils.js";
import ApiResponse from "../utils/api-response.js";

const registerUser = asyncHandler(async (req, res) => {
  //1. get incoming requests from client
  const { username, email, password, fullName } = req.body;

  //2. check if user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    return new ApiError(400, "User already exists");
  }

  // get avatar from req.file
  console.log(req.file);

  // 3. create user
  const newUser = await User.create({ username, email, password, fullName });
  // 4. send verification email
  const { unHashedToken, tokenExpiry } = newUser.generateTemporaryToken()
  // 5. save the unHashedToken and tokenExpiry in user
  newUser.emailVerificationToken = unHashedToken;
  newUser.emailVerificationExpiry = tokenExpiry;

  await newUser.save();

  await sendEmail({
    email: newUser.email,
    subject: 'Email Verification',
    mailGenContent: emailVerificationMailGenContent('username', `http://localhost:5000/api/v1/users/verify-email/${newUser.emailVerificationToken}`)
  })
  // 5. send response
  res.status(201).json(new ApiResponse(201, { message: "User created successfully" }, { user: newUser }));
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params
  // check if the token is present or not
  if (!token) {
    throw new ApiError(400, "Token is required");
  }

  // get the user having this token
  const user = await User.findOne({ emailVerificationToken: token }).select('-password');

  if (!user) {
    throw new ApiError(400, "Invalid token");
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;

  await user.save();

  res.status(200).json(new ApiResponse(200, { message: "Email verified successfully" }, { user: user }));

});

const logOut = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
});


const refreshAccessToken = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
});


const getCurrentUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 2. check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  // 3. check if email is verified
  if (!user.isEmailVerified) {
    throw new ApiError(400, "Email is not verified");
  }

  // 4. check if password is correct
  const isMatch = user.isPasswordMatched(password);
  // 5. if the password is correct, then generate access token and refresh token
  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  // 5. generate access token and refresh token
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('accessToken', accessToken, {
    httpOnly: true
  })

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true
  })


  delete user.refreshToken

  // 6. just attach the access token to the response,
  res.status(200).json(new ApiResponse(200, { message: "User logged in successfully" }, { user, accessToken }))

});


export { registerUser, verifyEmail, logOut, resendEmailVerification, refreshAccessToken, forgotPassword, changeCurrentPassword, getCurrentUser, loginUser }
