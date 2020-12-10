export = createRestReaderMiddleware;
/**
 * @typedef {Object} CuserExpressMiddlewareRestReaderOptions
 * @prop {WrappedHandler} [wrapper=defaultWrapper]
 * @prop {String} [mount='/message']
 */
/**
 *
 * @param {CuserCore} core
 * @param {CuserExpressMiddlewareRestReaderOptions & CuserReaderOptions} [opts]
 */
declare function createRestReaderMiddleware(core: CuserCore, opts?: CuserExpressMiddlewareRestReaderOptions & CuserReaderOptions): any;
declare namespace createRestReaderMiddleware {
    export { CuserCore, CuserReaderOptions, WrappedHandler, CuserExpressMiddlewareRestReaderOptions };
}
type CuserCore = import("@cuser/core").CuserCore;
type CuserExpressMiddlewareRestReaderOptions = {
    wrapper?: WrappedHandler;
    mount?: string;
};
type CuserReaderOptions = {
    mapper?: (message: import("@cuser/proto/graphs").GraphMessage) => Promise<any>;
};
type WrappedHandler = Function;
