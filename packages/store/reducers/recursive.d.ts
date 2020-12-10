export = recursiveReducer;
/**
 * Creates a recursive reducer for a certain key by, default parent
 * @param {Reducer} reducer
 * @param {MutantOptions} opts
 */
declare function recursiveReducer(reducer: Reducer, opts: any): (state: any, action: any) => any;
declare namespace recursiveReducer {
    export { Reducer, MutantOptions };
}
type Reducer = (state: any, action: import("redux").AnyAction) => any;
type MutantOptions = any;
