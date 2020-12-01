/** @typedef {import("@cuser/proto/types/graphs").GraphMessage} GraphMessage */
/** @typedef {import("@cuser/proto/types/actions").ActionPublishMessage} ActionPublishMessage */
/** @typedef {import("@cuser/proto/types/actions").ActionUpdateMessage} ActionUpdateMessage */

// Core
const assert = require('@cuser/utils/assert');
// Types
const { GraphType } = require('@cuser/proto/graphs');
const {
  TYPE_ACTION_PUBLISH_MESSAGE,
  TYPE_ACTION_UPDATE_MESSAGE,
  TYPE_ACTION_DELETE_MESSAGE
} = require('../types/actions');
const {
  TYPE_ERROR_USER_MUST_BE_THE_OWNER,
  TYPE_ERROR_MISSING_RESOURCE_ID,
} = require('../types/errors');
// Utils
const createReducer = require('../utils/createReducer');
// Reducers
const recursiveReducer = require('./recursive');


/**
 * Message reducer
 * @param {GraphMessage} [state]
 * @param {ActionPublishMessage|ActionUpdateMessage} action
 */
const messageReducer = createReducer({
  [TYPE_ACTION_PUBLISH_MESSAGE]:(state) => ({
    type: GraphType.GRAPH_MESSAGE,
    parent: state || null,
    id: '@uuid',
    user: '@user',
    content: '@content',
    cdate: '@timestamp',
    mdate: '@timestamp',
  }),
  [TYPE_ACTION_UPDATE_MESSAGE]: recursiveReducer((state, { payload }) => {
    const { messageId } = payload;
    if (state.id === messageId) {
      assert(payload.user.peerId === state.user.peerId, TYPE_ERROR_USER_MUST_BE_THE_OWNER, 'message')
      return {
        ...state,
        content: '@content',
        mdate: '@timestamp',
      }
    } else {
      assert(state.parent, TYPE_ERROR_MISSING_RESOURCE_ID, 'Message', messageId)
    }
  }),
  [TYPE_ACTION_DELETE_MESSAGE]: recursiveReducer((state, { payload }) => {
    const { messageId } = payload;
    if (state.id === messageId) {
      assert(payload.user.peerId === state.user.peerId, TYPE_ERROR_USER_MUST_BE_THE_OWNER, 'message')
      return state.parent
    } else {
      assert(state.parent, TYPE_ERROR_MISSING_RESOURCE_ID, 'Message', messageId)
    }
  })
});

module.exports = messageReducer;
