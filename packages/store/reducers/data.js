/** @typedef {import("@cuser/proto/types/actions").ActionPublishMessageContent} ActionPublishMessageContent */
/** @typedef {import("@cuser/proto/types/actions").ActionUpdateMessageContent} ActionUpdateMessageContent */

const { TYPE_ACTION_PUBLISH_MESSAGE, TYPE_ACTION_UPDATE_MESSAGE } = require('../types/actions');
// Utils
const createReducer = require('../utils/createReducer');


/**
 * Data string state
 * @param {string} [state]
 * @param {ActionPublishMessageContent|ActionUpdateMessageContent} action
 */
const dataReducer = createReducer({
  [TYPE_ACTION_PUBLISH_MESSAGE]: (_, {
    payload: {
      content: { data }
    }
  }) => data,
  [TYPE_ACTION_UPDATE_MESSAGE]: (state, {
    payload: {
      content: { data }
    }
  }) => data
});

module.exports = dataReducer;
