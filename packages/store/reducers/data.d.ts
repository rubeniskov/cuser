export = dataReducer;
/**
 * Data string state
 * @param {string} [state]
 * @param {ActionPublishMessage|ActionUpdateMessage} action
 */
declare const dataReducer: import("redux").Reducer<any, import("redux").AnyAction>;
declare namespace dataReducer {
    export { ActionPublishMessage, ActionUpdateMessage };
}
type ActionPublishMessage = import("@cuser/proto/types/actions").ActionPublishMessage;
type ActionUpdateMessage = import("@cuser/proto/types/actions").ActionUpdateMessage;
