/** @typedef {import("@cuser/proto/types/graphs").GraphUser} GraphUser */
/** @typedef {import("@cuser/proto/types/actions").ActionPublishMessage} ActionPublishMessage */
const { GraphType } = require('@cuser/proto/graphs');
const {
  TYPE_ACTION_PUBLISH_MESSAGE,
} = require('../types/actions');
const { createReducer } = require('../utils');

/**
 * User reducer
 * @param {GraphUser} [state]
 * @param {ActionPublishMessage} action
 */
const userReducer = createReducer({
  [TYPE_ACTION_PUBLISH_MESSAGE]: (_, { payload: { user: { avatar, username, peerId } } = {} }) => ({
    type: GraphType.GRAPH_USER,
    username,
    peerId,
    avatar
  })
});

module.exports = userReducer;
