import ApiResponse from "../utils/api-response.js";

function healthCheck(req, res, next) {
  res.status(200).json(new ApiResponse(200, { message: 'server is running' }));
}

export { healthCheck } 