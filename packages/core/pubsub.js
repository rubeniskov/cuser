// @ts-check
/** @typedef {import('ipfs-core/src/components').IPFSAPI} Node */
const Room = require('ipfs-pubsub-room');
const cbor = require('cbor');
const EventEmiter = require('events');

/**
 * @typedef {Object} CuserClientPubSubOptions
 * @prop {(data: Object) => Buffer} [encode=cbor.encode] Encoder function to serialize event object
 * @prop {(buf: Buffer) => Object} [decode=cbor.decodeFirstSync] Decoder function to unserialize event object
 * @prop {String|Promise<String>} [channel='@cuser']
 */

const randomSeqno = (bytes) => Buffer.from(new Array(bytes).fill(null).map(() => ~~(Math.random() * 0xFF)))

/**
 * Creates a room using EventEmiter
 * @param {Node} node
 * @param {String} channel
 */
const createRoomFromEventEmiter = (node, channel) => {
  const pid = node.id();
  // @ts-ignore
  const evm = new EventEmiter();
  return {
    subscribe: (listener) => {
      evm.addListener(`message:${channel}`, listener);
      return () => {
        evm.removeListener(`message:${channel}`, listener);
      }
    },
    broadcast: (data) => {
      Promise.resolve(pid).then(({ id }) => {
        evm.emit(`message:${channel}`, {
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
 * Creates a room using IPFS
 * @param {Node} node
 * @param {String} channel
 */
const createRoomFromIpfs = (node, channel) => {
  const pubsub = node.pubsub;
  return {
    subscribe: (listener) => {
      pubsub.subscribe(channel, listener, {
        discover: true
      });
      return () => {
        pubsub.unsubscribe(channel, listener);
      }
    },
    broadcast: (data) => {
      pubsub.publish(channel, data);
    }
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

    this._room = Promise.resolve(node)
      .then(async (node) => {
        if (!node.pubsub) {
          console.warn('ipfs.pubsub is not detected, so there\'s no way to attach remote incoming changes');
        }
        const ch = await channel;
        return node.pubsub ? createRoomFromIpfs(node, ch) : createRoomFromEventEmiter(node, ch);
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

    const unsubscribe = this._room.then(room => room.subscribe(listener));

    return () => {
      unsubscribe.then((unsubscribe) => unsubscribe());
    };
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
