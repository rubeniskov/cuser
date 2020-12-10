export = createRestPublisherMiddleware;
/**
 * @typedef {Object} CuserExpressMiddlewareRestReaderOptions
 * @prop {WrappedHandler} [wrapper=defaultWrapper]
 * @prop {String} [mount='/message']
 */
/**
 *
 * @param {CuserCore} core
 * @param {CuserAuth} auth
 * @param {CuserExpressMiddlewareRestReaderOptions & CuserPublisherOptions & CuserExpressMiddlewareAuthGuardOptions} [opts]
 */
declare function createRestPublisherMiddleware(core: CuserCore, auth: CuserAuth, opts?: CuserExpressMiddlewareRestReaderOptions & CuserPublisherOptions & CuserExpressMiddlewareAuthGuardOptions): any;
declare namespace createRestPublisherMiddleware {
    export { CuserCore, CuserAuth, CuserPublisherOptions, CuserExpressMiddlewareAuthGuardOptions, WrappedHandler, CuserExpressMiddlewareRestReaderOptions };
}
type CuserCore = import("@cuser/core").CuserCore;
type CuserAuth = import("@cuser/auth").CuserAuth;
type CuserExpressMiddlewareRestReaderOptions = {
    wrapper?: WrappedHandler;
    mount?: string;
};
type CuserPublisherOptions = {
    restore?: boolean;
};
type CuserExpressMiddlewareAuthGuardOptions = any;
type WrappedHandler = Function;
