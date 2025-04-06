import { validationResult } from "express-validator"
import ApiError from "../utils/api-errors";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  throw new ApiError(422, "Recieved data us not valid", extractedErrors);
}