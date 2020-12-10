export = createSerializeEnhancer;
/**
 * @param {Array<String>} patterns
 * @param {CuserSerializeEnhancerOptions & CuserSerializeOptions & CuserDeserializeOptions} opts
 */
declare function createSerializeEnhancer(patterns: Array<string>, opts: CuserSerializeEnhancerOptions & CuserSerializeOptions & CuserDeserializeOptions): (createStore: any) => (rootReducer: any, initialState: any, enhancer: any) => any;
declare namespace createSerializeEnhancer {
    export { Reducer, AnyAction, Action, CuserStoreSerializeReducerOptions, CuserSerializeCheck, CuserSerializeOptions, CuserDeserializeOptions, CuserSerializeProcessMap, CuserSerializeReducer, CuserSerializeMappingEntry, CuserSerializeMappingAlias, CuserSerializeMapping, CuserSerializeAliases, CuserSerializeEnhancerOptions };
}
type CuserSerializeEnhancerOptions = {
    deeper?: boolean;
    nullable?: boolean;
    promise?: boolean;
    processPattern?: (pointer: string, action: any) => string;
};
type CuserSerializeOptions = {
    serializable?: CuserSerializeCheck;
    serialize?: (state: object) => Promise<string>;
};
type CuserDeserializeOptions = {
    deserializable?: CuserSerializeCheck;
    deserialize?: (state: string) => Promise<any>;
};
type Reducer = (state: any, action: import("redux").AnyAction) => any;
type AnyAction = import("redux").AnyAction;
type Action = import("redux").Action<any>;
type CuserStoreSerializeReducerOptions = {
    deeper?: boolean;
    nullable?: boolean;
    promise?: boolean;
    processPattern?: (pointer: string, action: any) => string;
};
type CuserSerializeCheck = (state: any) => boolean;
type CuserSerializeProcessMap = (pointer: string, action: object) => string;
type CuserSerializeReducer = (state: any, action: AnyAction, options: object) => any;
type CuserSerializeMappingEntry = any[];
type CuserSerializeMappingAlias = string | CuserSerializeMappingEntry;
type CuserSerializeMapping = {
    [x: string]: CuserSerializeMappingAlias;
};
type CuserSerializeAliases = {
    [x: string]: CuserSerializeReducer;
};
