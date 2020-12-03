export = createStore;
/**
 * @typedef {CuserSerializeEnhancerOptions} CuserStoreOptions
 */
/**
 * @typedef {Object} CuserStore
 * @prop {(action: Action) => Promise<any>} exec
 * @prop {() => any} getState
 * @prop {(subscriber: Function) => any} subscribe
 */
/**
 *
 * @param {CuserStoreOptions} opts
 * @returns {Store & CuserStore}
 */
declare function createStore(opts: CuserStoreOptions): Store & CuserStore;
declare namespace createStore {
    export { Store, Action, CuserConfigureStoreOptions, CuserSerializeEnhancerOptions, CuserStoreOptions, CuserStore };
}
type CuserStoreOptions = {
    isSerializable?: () => boolean;
    isDeserializable?: () => boolean;
    mapping?: Record<string, string>;
    aliases?: Record<string, import("redux").Reducer<any, import("redux").AnyAction>>;
    processMap?: (pointer: string, action: any) => string;
};
type Store = import("redux").Store<any, import("redux").AnyAction>;
type CuserStore = {
    exec: (action: Action) => Promise<any>;
    getState: () => any;
    subscribe: (subscriber: Function) => any;
};
type Action = import("redux").Action<any>;
type CuserConfigureStoreOptions = {
    preloadedState?: any;
    enhancer?: import("redux").StoreEnhancer<{}, {}>;
};
type CuserSerializeEnhancerOptions = {
    isSerializable?: () => boolean;
    isDeserializable?: () => boolean;
    mapping?: Record<string, string>;
    aliases?: Record<string, import("redux").Reducer<any, import("redux").AnyAction>>;
    processMap?: (pointer: string, action: any) => string;
};
