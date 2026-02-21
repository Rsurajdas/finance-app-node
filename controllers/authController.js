/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

const signToken = (id, tokenVersion) => {
  return jwt.sign({ id, tokenVersion }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id, user.tokenVersion);

  res.cookie('token', token, {
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 10 * 60 * 1000),
    // expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token: token,
    data: {
      user,
    },
  });
};

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Please provide valid email or password', 401));
  }

  user.tokenVersion += 1;

  await user.save({ validateBeforeSave: false });

  createSendToken(user, 200, res);
});

export const register = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const user = await User.findOne(newUser._id).select('-__v');
  createSendToken(user, 201, res);
});
