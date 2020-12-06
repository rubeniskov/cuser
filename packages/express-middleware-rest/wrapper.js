// @ts-check
/** @typedef {import('express').Handler} Handler */
/** @typedef {import('express').Request} Request */
/** @typedef {import('express').Response} Response */
/** @typedef {import('express').NextFunction} NextFunction */

/** @typedef {Function} WrappedHandler */

/**
 *
 * @param {WrappedHandler} wrappedHandler
 * @returns {Handler}
 */
const wrapper = (wrappedHandler) => (req, res, next) => wrappedHandler(req, res, next).then((data) => res.json(data), next).catch(next);

module.exports = wrapper;
