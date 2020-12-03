export = createSerializeEnhancer;
/**
 * @typedef {Object} CuserSerializeEnhancerOptions
 * @prop {() => Boolean} [isSerializable]
 * @prop {() => Boolean} [isDeserializable]
 * @prop {Record<string, string>} [mapping]
 * @prop {Record<string, Reducer>} [aliases]
 * @prop {(pointer: String, action: any) => String} [processMap]
 */
/**
 * @param {CuserSerializeEnhancerOptions} opts
 */
declare function createSerializeEnhancer(opts: CuserSerializeEnhancerOptions): (createStore: any) => (reducer: any, initialState: any, enhancer: any) => any;
declare namespace createSerializeEnhancer {
    export { Reducer, Action, CuserSerializeEnhancerOptions };
}
type CuserSerializeEnhancerOptions = {
    isSerializable?: () => boolean;
    isDeserializable?: () => boolean;
    mapping?: Record<string, string>;
    aliases?: Record<string, Reducer>;
    processMap?: (pointer: string, action: any) => string;
};
type Reducer = (state: any, action: import("redux").AnyAction) => any;
type Action = import("redux").Action<any>;
