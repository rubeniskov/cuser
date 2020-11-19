/** @typedef {import("@cuser/proto/types/actions").ActionUserCreate} ActionUserCreate */
const { User } = require('@cuser/proto/graphs');
const { bindAction } = require('./utils');
const userReducer = require('./reducers/user');
const userCreateAction = bindAction(userReducer, 'CREATE');


/**
 * @param {ActionUserCreate} payload
 */
const createUser = (payload) => {
  const state = userCreateAction(payload);
  return User.encode(state).finish();
}

module.exports = {
  createUser
};
