export = configureStore;
/**
 * @typedef {CuserSerializeEnhancerOptions} CuserStoreOptions
 */
/**
 * @param {Promise<PreloadedState>|PreloadedState} preloadedState
 * @param {CuserStoreOptions} opts
 * @returns {CuserStore}
 */
declare function configureStore(preloadedState: Promise<PreloadedState> | PreloadedState, opts: CuserStoreOptions): CuserStore;
declare namespace configureStore {
    export { GraphRoot, PreloadedState, CuserStore, CuserSerializeEnhancerOptions, CuserStoreOptions };
}
type PreloadedState = string | {
    type: import("@cuser/proto/graphs").GraphType;
    topics: {
        [x: string]: {
            type: import("@cuser/proto/graphs").GraphType;
            message: {
                type: import("@cuser/proto/graphs").GraphType;
                id: string;
                parent: string;
                content: {
                    type: import("@cuser/proto/graphs").GraphType;
                    parent: string;
                    revision: number;
                    data: {
                        [x: number]: number;
                        readonly BYTES_PER_ELEMENT: number;
                        readonly buffer: {
                            readonly byteLength: number;
                            slice: {};
                        } | {
                            readonly byteLength: number;
                            slice: {};
                        };
                        readonly byteLength: number;
                        readonly byteOffset: number;
                        copyWithin: {};
                        every: {};
                        fill: {};
                        filter: {};
                        find: {};
                        findIndex: {};
                        forEach: {};
                        indexOf: {};
                        join: {};
                        lastIndexOf: {};
                        readonly length: number;
                        map: {};
                        reduce: {};
                        reduceRight: {};
                        reverse: {};
                        set: {};
                        slice: {};
                        some: {};
                        sort: {};
                        subarray: {};
                        toLocaleString: {};
                        toString: {};
                        valueOf: {};
                        entries: {};
                        keys: {};
                        values: {};
                        includes: {};
                    };
                    cdate: number;
                };
                user: {
                    type: import("@cuser/proto/graphs").GraphType;
                    peerId: string;
                    username: string;
                    avatar: string;
                };
                cdate: number;
                mdate: number;
            };
            count: number;
        };
    };
};
type CuserStoreOptions = import("./enhancers/createSerializeReducer").CuserStoreSerializeReducerOptions & createSerializeEnhancer.CuserSerializeOptions & createSerializeEnhancer.CuserDeserializeOptions;
type CuserStore = {
    dispatch: (action: import("redux").AnyAction) => Promise<string>;
    getState: () => any;
    subscribe: (listener: () => void) => Function;
    replaceReducer: (nextReducer: import("redux").Reducer<any, import("redux").AnyAction>) => void;
};
type GraphRoot = import("@cuser/proto/graphs").GraphRoot;
type CuserSerializeEnhancerOptions = import("./enhancers/createSerializeReducer").CuserStoreSerializeReducerOptions & createSerializeEnhancer.CuserSerializeOptions & createSerializeEnhancer.CuserDeserializeOptions;
import createSerializeEnhancer = require("./enhancers/createSerializeEnhancer");
