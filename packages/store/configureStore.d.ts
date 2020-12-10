export = configureStore;
/**
 * @typedef {CuserSerializeEnhancerOptions} CuserStoreOptions
 */
/**
 * @param {PreloadedState} preloadedState
 * @param {CuserStoreOptions} opts
 * @returns {CuserStore}
 */
declare function configureStore(preloadedState: PreloadedState, opts: CuserStoreOptions): CuserStore;
declare namespace configureStore {
    export { PreloadedState, Action, GraphRoot, CuserStore, CuserSerializeEnhancerOptions, CuserStoreOptions };
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
type CuserStoreOptions = {
    deeper?: boolean;
    nullable?: boolean;
    promise?: boolean;
    processPattern?: (pointer: string, action: any) => string;
};
type CuserStore = import("redux").Store<any, import("redux").AnyAction>;
type Action = import("redux").Action<any>;
type GraphRoot = import("@cuser/proto/graphs").GraphRoot;
type CuserSerializeEnhancerOptions = {
    deeper?: boolean;
    nullable?: boolean;
    promise?: boolean;
    processPattern?: (pointer: string, action: any) => string;
};
