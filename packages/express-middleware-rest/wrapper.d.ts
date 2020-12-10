export = wrapper;
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
declare function wrapper(wrappedHandler: WrappedHandler): any;
declare namespace wrapper {
    export { Handler, Request, Response, NextFunction, WrappedHandler };
}
type WrappedHandler = Function;
type Handler = any;
type Request = any;
type Response = any;
type NextFunction = any;
