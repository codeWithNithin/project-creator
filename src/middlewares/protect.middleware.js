import jwt from "jsonwebtoken";

async function protect(req, res, next) {
  const accessToken = req.cookies.accessToken || req.body.accessToken;

  if (!accessToken) {
    throw new ApiError(400, "Access token is required");
  }

  try {
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    if (!user) {
      throw new ApiError(401, "Invalid Access Token")
    }
    req.user = user
    next();
  } catch (error) {
    throw new ApiError(400, "Invalid access token");
  }

}

export default protect