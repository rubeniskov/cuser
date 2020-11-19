/** @typedef {import("./dag").WrappedDAG} WrappedDAG */
/** @typedef {import("ipfs-core/src/components").CID} CID */
/** @typedef {import("@cuser/proto/types/actions").ActionMessageCreate} ActionMessageCreate */
/** @typedef {import("@cuser/proto/types/actions").ActionMessageUpdate} ActionMessageUpdate */
/** @typedef {import("@cuser/proto/types/graphs").Message} GraphMessage */
const { getTopics } = require('./topics');
const { Message } = require('@cuser/proto/graphs');
const { bindAction } = require('./utils');
const messageReducer = require('./reducers/message');
const messageCreateAction = bindAction(messageReducer, 'CREATE');
const messageUpdateAction = bindAction(messageReducer, 'UPDATE');

/**
 * @param {WrappedDAG} dag
 * @param {CID} topicId
 * @param {ActionMessageCreate} payload
 */
const createMessage = async (dag, topicId, payload) => {
  const state = messageCreateAction(payload);
  const getTopics()

  return Message.encode(state).finish();
}

/**
 * @param {IPLD} ipld
 * @param {GraphMessage} previous
 * @param {ActionMessageUpdate} payload
 */
const updateMessage = (ipld, previous, payload) => {
  const state = messageUpdateAction(previous, payload);
  return Message.encode(state).finish();
}

/**
 * @param {IPLD} ipld
 * @param {GraphMessage} previous
 * @param {ActionMessageUpdate} payload
 */
const updateMessage = (ipld, previous, payload) => {
  const state = messageUpdateAction(previous, payload);
  return Message.encode(state).finish();
}

/**
 *
 * @param {Uint8Array} buf
 * @returns {GraphMessage}
 */
const decode = (buf) => Message.decode(buf).finish()

module.exports = {
  createMessage,
  updateMessage,
  decode
};
