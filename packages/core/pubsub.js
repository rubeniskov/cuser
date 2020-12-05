// @ts-check
/** @typedef {import('ipfs-core/src/components').IPFSAPI} Node */
const Room = require('ipfs-pubsub-room');
const cbor = require('cbor');
const EventEmiter = require('events');

/**
 * @typedef {Object} CuserClientPubSubOptions
 * @prop {(data: Object) => Buffer} [encode=cbor.encode] Encoder function to serialize event object
 * @prop {(buf: Buffer) => Object} [decode=cbor.decodeFirstSync] Decoder function to unserialize event object
 * @prop {String} [channel='@cuser']
 */

const randomSeqno = (bytes) => Buffer.from(new Array(bytes).fill(null).map(() => ~~(Math.random() * 0xFF)))
/**
 * Creates a room using EventEmiter
 */
const createRoomFromEventEmiter = (node, channel) => {
  const pid = node.id();
  // @ts-ignore
  const evm = new EventEmiter();
  return {
    on: evm.on.bind(evm),
    off: evm.off.bind(evm),
    broadcast: (data) => {
      Promise.resolve(pid).then(({ id }) => {
        evm.emit(`message`, {
          // https://github.com/ipfs-shipyard/ipfs-pubsub-room/blob/8c00b4fbfa7cbd47889fe035dfa9ac23638d9b58/src/index.js#L86
          seqno: randomSeqno(20),
          from: id,
          receivedFrom: id,
          data,
          topicIDs: [channel],
        });
      });
    },
  }
}

/**
 * Creates pubsub to listen changes on cuser network
 */
class ClientCorePubSub {
  /**
   * @param {Node|Promise<Node>} node
   * @param {CuserClientPubSubOptions} [opts]
   */
  constructor(node, opts) {
    const {
      encode = cbor.encode,
      decode = cbor.decodeFirstSync,
      channel = '@cuser'
    } = {
      ...opts
    }

    this._encode = encode;
    this._decode = decode;

    let createRoom = (n) => new Room(n, channel);

    this._room = Promise.resolve(node).then((node) => {
      if (node.pubsub) {
        console.warn('ipfs.pubsub is not detected, so there\'s no way to attach remote incoming changes');
      }
      return node.pubsub ? createRoom(node) : createRoomFromEventEmiter(node, channel);
    });
  }
  /**
   * @param {Object} payload
   */
  broadcast(payload) {
    this._room.then(room => room.broadcast(this._encode(payload)));
  }
  /**
   * @param {(payload: Object) => void} subscriber
   */
  subscribe(subscriber) {
    const listener = (payload) => {
      subscriber({ ...payload, data: this._decode(payload.data)});
    }
    this._room.then(room => room.on('message', listener));
    return () => this._room.then(room => room.off('message', listener));
  }
}

/**
 * Creates pubsub to listen changes on cuser network
 * @param {Node|Promise<Node>} node
 * @param {CuserClientPubSubOptions} [opts]
 */
const createPubSub = (node, opts) => new ClientCorePubSub(node, opts);

module.exports = createPubSub;
module.exports.ClientCorePubSub = ClientCorePubSub;
