export = createSerializeReducer;
/**
 * @typedef {Object} CuserStoreSerializeReducerOptions
 * @prop {Boolean} [deeper=false]
 * @prop {Boolean} [nullable=true]
 * @prop {Boolean} [promise=false]
 * @prop {(pointer: String, action: any) => String} [processPattern]
 */
/**
 * @param {Reducer} reducer
 * @param {Array<string>} patterns
 * @param {CuserStoreSerializeReducerOptions} [opts]
 */
declare function createSerializeReducer(reducer: Reducer, patterns: Array<string>, opts?: CuserStoreSerializeReducerOptions): (state: any, action: AnyAction) => any;
declare namespace createSerializeReducer {
    export { Reducer, AnyAction, CuserStoreSerializeReducerOptions };
}
type Reducer = (state: any, action: import("redux").AnyAction) => any;
type CuserStoreSerializeReducerOptions = {
    deeper?: boolean;
    nullable?: boolean;
    promise?: boolean;
    processPattern?: (pointer: string, action: any) => string;
};
type AnyAction = import("redux").AnyAction;
