export = createRestMiddleware;
/**
 * @typedef {Object} CuserExpressMiddlewareRestOptions
 * @prop {Boolean} [mount='/rest'] Path enpoint mount
 * @prop {Boolean} [ui=false] Enable swagger-ui
 * @prop {Boolean} [reader=false] Enable reading messages from api rest
 * @prop {Boolean} [publisher=true] Enable publishing messages from api rest
 */
/**
 *
 * @param {CuserCore} core
 * @param {CuserAuth} auth
 * @param {CuserExpressMiddlewareRestOptions} [opts]
 */
declare function createRestMiddleware(core: CuserCore, auth: CuserAuth, opts?: CuserExpressMiddlewareRestOptions): any;
declare namespace createRestMiddleware {
    export { defaults, CuserCore, CuserAuth, CuserExpressMiddlewareRestOptions };
}
type CuserCore = import("@cuser/core").CuserCore;
type CuserAuth = import("@cuser/auth").CuserAuth;
type CuserExpressMiddlewareRestOptions = {
    /**
     * Path enpoint mount
     */
    mount?: boolean;
    /**
     * Enable swagger-ui
     */
    ui?: boolean;
    /**
     * Enable reading messages from api rest
     */
    reader?: boolean;
    /**
     * Enable publishing messages from api rest
     */
    publisher?: boolean;
};
declare namespace defaults {
    const ui: boolean;
    const reader: boolean;
    const publisher: boolean;
    const mount: string;
}
