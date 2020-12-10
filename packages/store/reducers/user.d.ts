export = userReducer;
/**
 * User reducer
 * @param {GraphUser} [state]
 * @param {ActionPublishMessage} action
 */
declare const userReducer: import("redux").Reducer<any, import("redux").AnyAction>;
declare namespace userReducer {
    export { GraphUser, ActionPublishMessage };
}
type GraphUser = import("@cuser/proto/types/graphs").GraphUser;
type ActionPublishMessage = import("@cuser/proto/types/actions").ActionPublishMessage;
