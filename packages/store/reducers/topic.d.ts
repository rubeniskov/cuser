export = topicReducer;
/**
 * Topic reducer
 * @param {GraphTopic} [state]
 * @param {ActionPublishMessage|ActionUpdateMessage|ActionDeleteMessage} action
 */
declare const topicReducer: import("redux").Reducer<any, import("redux").AnyAction>;
declare namespace topicReducer {
    export { GraphTopic, ActionPublishMessage, ActionUpdateMessage, ActionDeleteMessage };
}
type GraphTopic = import("@cuser/proto/types/graphs").GraphTopic;
type ActionPublishMessage = import("@cuser/proto/types/actions").ActionPublishMessage;
type ActionUpdateMessage = import("@cuser/proto/types/actions").ActionUpdateMessage;
type ActionDeleteMessage = import("@cuser/proto/types/actions").ActionDeleteMessage;
