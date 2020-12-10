export = topicsReducer;
/**
 * Topic reducer
 * @param {Record<string,GraphTopic>} [state]
 * @param {ActionPublishMessage|ActionUpdateMessage|ActionDeleteMessage} action
 */
declare const topicsReducer: import("redux").Reducer<any, import("redux").AnyAction>;
declare namespace topicsReducer {
    export { GraphTopic, ActionPublishMessage, ActionUpdateMessage, ActionDeleteMessage };
}
type GraphTopic = import("@cuser/proto/types/graphs").GraphTopic;
type ActionPublishMessage = import("@cuser/proto/types/actions").ActionPublishMessage;
type ActionUpdateMessage = import("@cuser/proto/types/actions").ActionUpdateMessage;
type ActionDeleteMessage = import("@cuser/proto/types/actions").ActionDeleteMessage;
