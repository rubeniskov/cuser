// @ts-check
/** @typedef {import("@cuser/proto/types/actions").ActionPublishMessage} ActionPublishMessage */
/** @typedef {import("@cuser/proto/types/actions").ActionUpdateMessage} ActionUpdateMessage */

const { TYPE_ACTION_PUBLISH_MESSAGE, TYPE_ACTION_UPDATE_MESSAGE } = require('../types/actions');
// Utils
const createReducer = require('../utils/createReducer');


/**
 * Data string state
 * @param {string} [state]
 * @param {ActionPublishMessage|ActionUpdateMessage} action
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
