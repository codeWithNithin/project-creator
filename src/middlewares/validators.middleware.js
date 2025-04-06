import { validationResult } from "express-validator"
import ApiError from "../utils/api-errors.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  console.log('errors', errors)

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  throw new ApiError(422, "Recieved data us not valid", extractedErrors);
}