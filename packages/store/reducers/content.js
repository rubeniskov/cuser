/** @typedef {import("@cuser/proto/types/graphs").GraphContent} GraphContent */
/** @typedef {import("@cuser/proto/types/actions").ActionPublishMessageContent} ActionPublishMessageContent */
/** @typedef {import("@cuser/proto/types/actions").ActionUpdateMessageContent} ActionUpdateMessageContent */

// Core
const assert = require('@cuser/utils/assert');
// Types
const { GraphType } = require('@cuser/proto/graphs');
const { TYPE_ACTION_PUBLISH_MESSAGE, TYPE_ACTION_UPDATE_MESSAGE } = require('../types/actions');
const { TYPE_ERROR_MISSING_PREVIOUS_STATE } = require('../types/errors');
// Utils
const createReducer = require('../utils/createReducer');


/**
 * Content reducer for manage message data and its historical revisions,
 * when update action, the current state will be swaped to parent in order
 * to keep the tree changes
 * @param {GraphContent} [state]
 * @param {ActionPublishMessageContent|ActionUpdateMessageContent} action
 */
const contentReducer = createReducer({
  [TYPE_ACTION_PUBLISH_MESSAGE]: () => ({
    type: GraphType.GRAPH_CONTENT,
    parent: null,
    revision: '@revision',
    cdate: '@timestamp',
    data: '@data',
  }),
  [TYPE_ACTION_UPDATE_MESSAGE]: (state) => {
    assert(state, TYPE_ERROR_MISSING_PREVIOUS_STATE);
    return {
      ...state,
      parent: state,
      revision: '@revision',
      cdate: '@timestamp',
      data: '@data',
    }
  }
});

module.exports = contentReducer;
