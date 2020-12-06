export = createMessageMapper;
/** @typedef {import('@cuser/proto/graphs').GraphMessage} GraphMessage */
/**
 * @param {(hash: String) => Promise<Object>} resolve
 * @returns {(message: Object) => Promise<GraphMessage>}
 */
declare function createMessageMapper(resolve: (hash: string) => Promise<any>): (message: any) => Promise<GraphMessage>;
declare namespace createMessageMapper {
    export { GraphMessage };
}
type GraphMessage = import("@cuser/proto/graphs").GraphMessage;
