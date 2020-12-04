export = createPublisher;
/**
 * @param {CuserCore} core
 * @param {CuserStoreOptions} [opts]
 */
declare function createPublisher(core: CuserCore, opts?: CuserStoreOptions): CuserPublisher;
declare namespace createPublisher {
    export { CuserPublisher, CuserCore, CuserStore, CuserStoreOptions, PayloadPublishMessage, PayloadUpdateMessage, PayloadDeleteMessage };
}
type CuserCore = import("@cuser/core/types/core").CuserCore;
type CuserStoreOptions = {
    isSerializable?: () => boolean;
    isDeserializable?: () => boolean;
    mapping?: Record<string, string>;
    aliases?: Record<string, import("redux").Reducer<any, import("redux").AnyAction>>;
    processMap?: (pointer: string, action: any) => string;
};
/**
 *
 */
declare class CuserPublisher {
    /**
     * @param {CuserCore} core
     * @param {CuserStoreOptions} [opts]
     */
    constructor(core: CuserCore, opts?: CuserStoreOptions);
    _core: import("@cuser/core/types/core").CuserCore;
    /** @type {CuserStore} */
    _store: CuserStore;
    /**
     *
     * @param {PayloadPublishMessage} payload
     */
    publish(payload: PayloadPublishMessage): Promise<import("@cuser/core/types/core").PublishResult>;
    /**
     * Update message and gets computed cid
     * @param {PayloadUpdateMessage} payload
     */
    update(payload: PayloadUpdateMessage): Promise<import("@cuser/core/types/core").PublishResult>;
    /**
     *
     * @param {PayloadDeleteMessage} payload
     */
    delete(payload: PayloadDeleteMessage): Promise<import("@cuser/core/types/core").PublishResult>;
}
type CuserStore = {
    exec: (action: import("redux").Action<any>) => Promise<any>;
    getState: () => any;
    subscribe: (subscriber: Function) => any;
};
type PayloadPublishMessage = import("@cuser/proto/payloads").PayloadPublishMessage;
type PayloadUpdateMessage = import("@cuser/proto/payloads").PayloadUpdateMessage;
type PayloadDeleteMessage = import("@cuser/proto/payloads").PayloadDeleteMessage;
