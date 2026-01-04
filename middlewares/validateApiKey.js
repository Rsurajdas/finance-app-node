import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const validateApiKey = catchAsync((req, res, next) => {
  const apiKeyFromClient = req.header["x-api-key"];
  // eslint-disable-next-line no-undef
  const validApiKey = process.env.API_KEY;

  if (!apiKeyFromClient && apiKeyFromClient !== validApiKey) {
    return next(AppError("Invalid or missing API key", 401));
  }

  next();
});
