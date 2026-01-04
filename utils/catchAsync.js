/**
 * Utility function to catch errors in asynchronous Express route handlers.
 *
 * Wraps an async controller function and automatically forwards any rejected
 * promises or thrown errors to the Express error-handling middleware via `next`.
 * This eliminates the need for repetitive try–catch blocks in each controller.
 *
 * @function catchAsync
 *
 * @param {Function} fn - An asynchronous Express route handler
 * `(req, res, next) => Promise<void>`.
 *
 * @returns {Function} A wrapped Express middleware function that catches
 * async errors and passes them to `next()`.
 *
 * @example
 * router.get(
 *   '/users',
 *   catchAsync(async (req, res, next) => {
 *     const users = await User.find();
 *     res.status(200).json({ status: 'success', data: users });
 *   })
 * );
 */

export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
