/**
 * Custom application error class for handling operational errors consistently.
 *
 * Extends the native JavaScript Error object by adding HTTP-specific metadata
 * such as status codes and operational flags. This class is intended to be used
 * for expected, handled errors (e.g., validation errors, authentication errors),
 * allowing centralized error handling middleware to distinguish them from
 * programming or unknown errors.
 *
 * @class AppError
 * @extends Error
 *
 * @param {string} message - Human-readable error message describing what went wrong.
 * @param {number} statusCode - HTTP status code associated with the error (e.g., 400, 401, 404, 500).
 * @param {Object|Error} [error] - Optional original error object or additional error details.
 *
 * @property {number} statusCode - HTTP status code for the error.
 * @property {string} status - Error status derived from statusCode ("fail" for 4xx, "error" for 5xx).
 * @property {boolean} isOperational - Indicates whether the error is an expected operational error.
 * @property {Object|Error} error - Stores the original error or additional error context.
 */

class AppError extends Error {
  constructor(message, statusCode, error) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.error = error;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
