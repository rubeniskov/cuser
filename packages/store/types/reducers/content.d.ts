export = contentReducer;
/**
 * Content reducer for manage message data and its historical revisions,
 * when update action, the current state will be swaped to parent in order
 * to keep the tree changes
 * @param {GraphContent} [state]
 * @param {ActionPublishMessage|ActionUpdateMessage} action
 */
declare const contentReducer: (state: any, action: any, opts: any) => any;
declare namespace contentReducer {
    export { GraphContent, ActionPublishMessage, ActionUpdateMessage };
}
type GraphContent = import("@cuser/proto/types/graphs").GraphContent;
type ActionPublishMessage = import("@cuser/proto/types/actions").ActionPublishMessage;
type ActionUpdateMessage = import("@cuser/proto/types/actions").ActionUpdateMessage;
