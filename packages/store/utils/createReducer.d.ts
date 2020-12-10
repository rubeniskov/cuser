export = createReducer;
/**
 *
 * @param {Record<string, Reducer>} mutations
 * @returns {Reducer}
 */
declare function createReducer(mutations: Record<string, Reducer>): Reducer;
declare namespace createReducer {
    export { Reducer };
}
type Reducer = (state: any, action: import("redux").AnyAction) => any;
