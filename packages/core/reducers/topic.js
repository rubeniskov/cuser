/** @typedef {import("@cuser/proto/types/graphs").GraphTopic} GraphTopic */
/** @typedef {import("@cuser/proto/types/actions").ActionPublishMessage} ActionPublishMessage */
/** @typedef {import("@cuser/proto/types/actions").ActionUpdateMessage} ActionUpdateMessage */
/** @typedef {import("@cuser/proto/types/actions").ActionDeleteMessage} ActionDeleteMessage */
const { GraphType } = require('@cuser/proto/graphs');
const {
  TYPE_ACTION_PUBLISH_MESSAGE,
  TYPE_ACTION_UPDATE_MESSAGE,
  TYPE_ACTION_DELETE_MESSAGE
} = require('../types/actions');
const { createReducer } = require('../utils');
/**
 * Topic reducer
 * @param {GraphTopic} [state]
 * @param {ActionPublishMessage|ActionUpdateMessage|ActionDeleteMessage} action
 */
const topicReducer = createReducer({
  [TYPE_ACTION_PUBLISH_MESSAGE]: ({ count = 0 } = {}) => ({
    type: GraphType.GRAPH_TOPIC,
    message: '@message',
    count: count + 1
  }),
  [TYPE_ACTION_UPDATE_MESSAGE]: (state) => ({
    ...state,
    message: '@message',
  }),
  [TYPE_ACTION_DELETE_MESSAGE]: (state) => state.count === 1 ? null : ({
    ...state,
    message: '@message',
    count: state.count - 1
  })
});

module.exports = topicReducer;
