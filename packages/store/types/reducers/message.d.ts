export = messageReducer;
/**
 * Message reducer
 * @param {GraphMessage} [state]
 * @param {ActionPublishMessage|ActionUpdateMessage} action
 */
declare const messageReducer: (state: any, action: any, opts: any) => any;
declare namespace messageReducer {
    export { GraphMessage, ActionPublishMessage, ActionUpdateMessage };
}
type GraphMessage = import("@cuser/proto/types/graphs").GraphMessage;
type ActionPublishMessage = import("@cuser/proto/types/actions").ActionPublishMessage;
type ActionUpdateMessage = import("@cuser/proto/types/actions").ActionUpdateMessage;
