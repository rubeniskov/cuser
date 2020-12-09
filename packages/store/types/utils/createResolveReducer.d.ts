export = createResolveReducer;
/**
 * @typedef {Object} CuserStoreResolveReducerOptions
 * @prop {Record<string, Reducer>} [aliases={}]
 * @prop {Number} [maxRecursion=10]
 */
/**
 *
 * @param {Reducer} rootReducer
 * @param {CuserStoreResolveReducerOptions & MutantOptions} [opts]
 */
declare function createResolveReducer(rootReducer: Reducer, opts?: CuserStoreResolveReducerOptions & MutantOptions): (state: any, action: AnyAction) => any;
declare namespace createResolveReducer {
    export { AnyAction, Reducer, MutantOptions, CuserStoreResolveReducerOptions };
}
type Reducer = (state: any, action: import("redux").AnyAction) => any;
type CuserStoreResolveReducerOptions = {
    aliases?: Record<string, Reducer>;
    maxRecursion?: number;
};
type MutantOptions = {
    recursive?: boolean;
    nested?: boolean;
    step?: boolean;
    test?: any;
    once?: boolean;
    promises?: boolean;
    promise?: boolean;
    iterator?: any;
    patcher?: Function;
};
type AnyAction = import("redux").AnyAction;
