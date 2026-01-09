import AppError from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

const validateApiKey = catchAsync(async (req, res, next) => {
  const apiKeyFromClient = req.header('x-api-key');

  // eslint-disable-next-line no-undef
  if (!apiKeyFromClient || apiKeyFromClient !== process.env.API_KEY) {
    return next(new AppError('Invalid or missing API key', 401));
  }

  next();
});

export default validateApiKey;
