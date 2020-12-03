// @ts-check
/** @typedef {import('ipfs-core/src/components').IPFSAPI} Node */
const Room = require('ipfs-pubsub-room');
const cbor = require('cbor');
const EventEmiter = require('events');

/**
 * @typedef {Object} CuserClientPubSubOptions
 * @prop {(data: Object) => Buffer} [encode=cbor.encode] Encoder function to serialize event object
 * @prop {(data: Object) => Buffer} [decode=cbor.decodeFirstSync] Decoder function to unserialize event object
 * @prop {String} [channel='@cuser']
 */

/**
 * Creates a room using EventEmiter
 * @param {Node} node
 */
const createRoomFromEventEmiter = (node) => {
  const id = node.id();
  // @ts-ignore
  const evm = new EventEmiter();
  return {
    on: evm.on.bind(evm),
    off: evm.off.bind(evm),
    broadcast: (data) => {
      Promise.resolve(id).then(({ id }) => {
        evm.emit(`message`, {
          from: id,
          data
        });
      });
    },
  }
}

/**
 * Creates pubsub cuser to listen changes on cuser network
 * @param {Node} node
 * @param {CuserClientPubSubOptions} [opts]
 */
const createPubSub = (node, opts) => {
  const {
    encode = cbor.encode,
    decode = cbor.decodeFirstSync,
    channel = '@cuser'
  } = {
    ...opts
  }

  let createRoom = (n) => new Room(n, channel)

  if (!node.pubsub) {
    console.warn('ipfs.pubsub is not detected, so there\'s no way to attach remote incoming changes');
  }

  const room = node.pubsub ? createRoom(node) : createRoomFromEventEmiter(node);

  return {
    /**
     * @param {String} topicId
     * @param {Object} payload
     */
    broadcast: (topicId, payload) => {
      room.broadcast(encode({ topicId, ...payload }));
    },
    subscribe: (topicId, subscriber) => {

      const listener = (payload) => {
        const { data, from } = payload;
        const { type, topicId: recivedTopicId, ...restData } = decode(data);

        if (type && topicId === recivedTopicId) {
          subscriber({
            type,
            topicId,
            from,
            ...restData
          });
        }
      }

      room.on('message', listener);
      return () => room.off('message', listener)
    }
  }
}

module.exports = createPubSub;
