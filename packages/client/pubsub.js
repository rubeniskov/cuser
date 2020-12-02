const Room = require('ipfs-pubsub-room');
const cbor = require('cbor');
const EventEmiter = require('events');

const createRoomFromEventEmiter = (node) => {
  const id = node.id();
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
    broadcast: (topicId, evt) => {
      room.broadcast(encode({ topicId, ...evt }));
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
