import jwt from 'jsonwebtoken';
import { promisify } from 'node:util';

import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

const protectedRoute = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  // eslint-disable-next-line no-undef
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    );
  }

  if (decoded.tokenVersion !== user.tokenVersion) {
    return next(
      new AppError('Your session has expired. Please log in again.', 401)
    );
  }

  if (user.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password, Please login again!')
    );
  }

  req.user = user;

  next();
});

export default protectedRoute;
