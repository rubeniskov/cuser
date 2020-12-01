/** @typedef {import("@cuser/proto/types/graphs").GraphTopic} GraphTopic */
/** @typedef {import("@cuser/proto/types/actions").ActionPublishMessage} ActionPublishMessage */
/** @typedef {import("@cuser/proto/types/actions").ActionUpdateMessage} ActionUpdateMessage */
/** @typedef {import("@cuser/proto/types/actions").ActionDeleteMessage} ActionDeleteMessage */

// Core
const assert = require('@cuser/utils/assert');
// Types
const {
  TYPE_ACTION_PUBLISH_MESSAGE,
  TYPE_ACTION_UPDATE_MESSAGE,
  TYPE_ACTION_DELETE_MESSAGE
} = require('../types/actions');
const {
  TYPE_ERROR_MISSING_RESOURCE_ID,
} = require('../types/errors');
// Utils
const createReducer = require('../utils/createReducer');


/**
 * Topic reducer
 * @param {Record<string,GraphTopic>} [state]
 * @param {ActionPublishMessage|ActionUpdateMessage|ActionDeleteMessage} action
 */
const topicsReducer = createReducer({
  [TYPE_ACTION_PUBLISH_MESSAGE]: (state, { payload: { topicId } }) => ({
    ...state,
    [topicId]: '@topic'
  }),
  [TYPE_ACTION_UPDATE_MESSAGE]: (state, { payload: { topicId } }) => {
    assert(state && state[topicId], TYPE_ERROR_MISSING_RESOURCE_ID, 'Topic', topicId);
    return {
      ...state,
      [topicId]: '@topic'
    }
  },
  [TYPE_ACTION_DELETE_MESSAGE]: (state, { payload: { topicId } }) => {
    assert(state && state[topicId], TYPE_ERROR_MISSING_RESOURCE_ID, 'Topic', topicId);
    return {
      ...state,
      [topicId]: '@topic'
    }
  }
});

module.exports = topicsReducer;
