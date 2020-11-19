/** @typedef {import("@cuser/proto/types/actions").ActionContentCreate} ActionContentCreate */
/** @typedef {import("@cuser/proto/types/actions").ActionContentUpdate} ActionContentUpdate */
/** @typedef {import("@cuser/proto/types/graphs").Content} GraphContent */

const { Content } = require('@cuser/proto/graphs');
const { bindAction } = require('./utils');
const contentReducer = require('./reducers/content');
const contentCreateAction = bindAction(contentReducer, 'CREATE');
const contentUpdateAction = bindAction(contentReducer, 'UPDATE');

/**
 * @param {ActionContentCreate} payload
 */
const createContent = (payload) => {
  const state = contentCreateAction(payload);
  return Content.encode(state).finish();
}

/**
 * @param {GraphContent} parent
 * @param {ActionContentUpdate} payload
 */
const updateContent = (previous, payload) => {
  const state = contentUpdateAction(previous, payload);
  return Content.encode(state).finish();
}

module.exports = {
  createContent,
  updateContent
};
