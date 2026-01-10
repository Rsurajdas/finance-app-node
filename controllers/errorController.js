import AppError from '../utils/appError.js';

const handleCastErrorDb = (error) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldErrorDb = (error) => {
  const errorObj = error.keyValue;
  const errors = Object.keys(errorObj).reduce((obj, key) => {
    obj[key] = `Duplicate field value: ${errorObj[key]}`;
    return obj;
  }, {});
  const message = 'Please choose a different value.';
  return new AppError(message, 400, errors);
};

const handleValidationErrorDb = (error) => {
  const errors = Object.values(error.errors).reduce((obj, err) => {
    obj[err.path] = err.message;
    return obj;
  }, {});
  const message = 'Invalid input data';
  return new AppError(message, 400, errors);
};

const handleJWTError = () => new AppError(`Invalid token. Please log in again!`, 401);

const handleJWTExpiredError = () =>
  new AppError(`Your token has expired! Please log in again!`, 401);

const sendErrorDev = (err, res) => {
  const response = {
    ...err,
    stack: err.stack,
  };
  res.status(err.statusCode).json(response);
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.name === 'CastError') err = handleCastErrorDb(err);
  if (err.code === 11000) err = handleDuplicateFieldErrorDb(err);
  if (err.name === 'ValidationError') err = handleValidationErrorDb(err);
  if (err.name === 'JsonWebTokenError') err = handleJWTError(err);
  if (err.name === 'TokenExpiredError') err = handleJWTExpiredError(err);

  sendErrorDev(err, res);
};

export default globalErrorHandler;
