/**
 * Success response
 *
 * @param  {Integer} statusCode - status code
 * @param  {String} message - response message
 * @param {Array} response - data object
 * @returns {object} response object
 */
export const successResponse = (res, statusCode, message, data) =>
  res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
