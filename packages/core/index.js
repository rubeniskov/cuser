/** @typedef {import("@cuser/proto/payloads").PayloadPublishMessage} PayloadPublishMessage */
/** @typedef {import("@cuser/proto/payloads").PayloadUpdateMessage} PayloadUpdateMessage */
/** @typedef {import("@cuser/proto/payloads").PayloadDeleteMessage} PayloadDeleteMessage */
/** @typedef {import("@cuser/proto/payloads").PayloadQueryMessages} PayloadQueryMessages */

const createStore = require('./store');
const traverseJson = require('traverse-json');
const createNode = require("./createNode");
const wrapDag = require('./dag');

const {
  TYPE_ACTION_PUBLISH_MESSAGE,
  TYPE_ACTION_UPDATE_MESSAGE,
  TYPE_ACTION_DELETE_MESSAGE,
} = require('./types/actions');

// const { stats } = require("ipfs-core/src/components");

const dispatchAction = (store, action) => store.exec(action)

const createAction = (type, payload) => ({ type, payload });
class Core {
  constructor(options) {
    this.dag = wrapDag(createNode(options));

    const isDagLink = (link) => typeof link === 'string' && link.length === 110;

    this.store = createStore({
      preloadedState: this.dag.then(({ root }) => root()).then((cid) => cid.replace(/^\/ipfs\//, '')),
      isDeserializable: isDagLink,
      serialize: (value) => this.dag.then(({ put }) => put(value)).then((cid) => cid.toString()),
      deserialize: (value) => this.dag.then(({ get }) => get(value)).then((node) => node.value)
    });
  }

  /**
   *
   * @param {PayloadPublishMessage} payload
   */
  async publish(payload) {
    return this.store.exec(createAction(TYPE_ACTION_PUBLISH_MESSAGE, payload))
      .then((cid) => {
        return this.dag.then(({ publish }) => publish(cid));
      });
  }

  /**
   * Update message and gets computed cid
   * @param {PayloadUpdateMessage} payload
   */
  async update(payload) {
    return dispatchAction(this.store, createAction(TYPE_ACTION_UPDATE_MESSAGE, payload))
      .then((cid) => {
        return this.dag.then(({ publish }) => publish(cid));
      });
  }

  /**
   *
   * @param {PayloadDeleteMessage} payload
   */
  async delete(payload) {
    return dispatchAction(this.store, createAction(TYPE_ACTION_DELETE_MESSAGE, payload))
      .then((cid) => {
        return this.dag.then(({ publish }) => publish(cid));
      });
  }

  /**
   *
   * @param {PayloadQueryMessages} payload
   */
  async query(payload) {
    return this.dag.then(({ root }) => root()).then((cid) => cid.replace(/^\/ipfs\//, '')).then((cid) => {
      return this.dag.then(({ get }) => get(cid).then(({ value }) => value));
    })
    .then((root) => {
      return root;
      const after = payload.after;
      const topic = root.topics[payload.topicId];
      if (!topic) throw new Error('Topic not found');
      const message = topic.message
      if (!message) return [];
      const ientries = traverseJson.createIterator(message, '@parent');
      let found = false;
      let results = [];
      for (let [_, message] of ientries) {
        if (message === null) break;
        if (!after || after === message.id) found = true
        if (found) {
          const { parent, ...computed } = message;
          results.push(computed);
        }
      }
      return results;
    });
  }
}

const core = (opts) => {
  return new Core(opts);
}

module.exports = core;


 // const rehydrate = (state, action) => {
    //   if (action.type === TYPE_ACTION_REHYDRATE) {
    //     return action.payload;
    //   } else {
    //     this.dag.then(({ get }) => get(state)).then((node) => {
    //       this.store.dispatch({
    //         type: TYPE_ACTION_REHYDRATE,
    //         payload: node.value,
    //       });
    //     });
    //   }

    //   return state;
    // }
    // const resolvers = {
    //   '@user': rehydrate,
    //   '@message': rehydrate,
    //   '@content': rehydrate,
    // }

// const all = require("it-all");
// const { tap } = require('./utils');

// async publish(topicCid, userToken, data) {
//   topicCid = topicCid || 'QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB';

//   const dag = await this.dag;
//   console.log(dag);

//   return

//   // userToken
//   //  - peerId
//   //  - username
//   //  - avatar


//   // resourceCid

//   // PAYLOAD
//   // user: User
//   // cdate: int32
//   // reactions: Number[]

//   const node = await this.node;
//   // node.id().then(console.log);
//   const topic = await getTopic(node, topicCid);
//   const topics = await getTopics(node);
//   // console.log(topics);

//   const commentCount = tap(topic, `comments.count`, 0)
//   const parent = tap(topic, `comments.last`, null)

//   const payloadComment = {
//     type: 'comment',
//     cdate: new Date().getTime(),
//     mdate: new Date().getTime(),
//     parent,
//     index: commentCount,
//     content: `Esto es una prueba de comentario mumero ${commentCount}`,
//     user: {
//       // local go ipfs
//       peerId: 'QmZiT6CVzd2cJftz8z8RKWXd72h2hf9GN43s5kihBzvqbn',
//       username: 'rubeniskov',
//       avatar: 'https://s.gravatar.com/avatar/1256fe7af685cee65ab930225e803cad?size=496&default=retro',
//     }
//   }
//   debugger;
//   const cidCborComment = await node.dag.put(payloadComment, { format: 'dag-cbor', hashAlg: 'sha3-512' });
//   const cidCborArticles = await node.dag.put({
//     type: 'manifest',
//     topics: {
//       ...topics,
//       [topicCid]: {
//         likes: 1,
//         comments:{
//           count: (isNaN(commentCount) ? 0 : commentCount) + 1,
//           last: cidCborComment.toString(),
//           reactions: [],
//         }
//       }
//     }
//   }, { format: 'dag-cbor', hashAlg: 'sha3-512' });


//   return node.name.publish(cidCborArticles, { allowOffline: true});
// }
// tree(resourceId) {

//   // return await ipfs.dag.tree(obj, { format: 'dag-cbor', hashAlg: 'sha3-512' })
// }
// edit(commentId, userId) {
//   // await ipfs.dag.put(obj, { format: 'dag-cbor', hashAlg: 'sha3-512' })
// }
// remove(commentId, userId) {
//   // await ipfs.dag.put(obj, { format: 'dag-cbor', hashAlg: 'sha3-512' })
// }
// async comments(topicCid, limit) {
//   const node = await this.node;
//   const topic = await getTopic(node, topicCid);

//   if (!topic) {
//     return [];
//   }

//   const next = async(cid, results = []) => {
//     const { value } = await node.dag.get(cid);
//     results.push(value)
//     if (value.parent) {
//       await next(value.parent, results)
//     }

//     return results
//   }
//   return next(tap(topic, `comments.last`, 0))
// }
// async comments(resourceCid) {
//   const node = await this.node;
//   const { id } = await node.id();
//   const state = await node.name.pubsub.state();
//   const resolved = await all(node.name.resolve(id));

//   console.log(state, resolved);
//   return Promise.all(resolved.map(async (cid) => {
//     const tree = await all(node.dag.tree(cid))
//     const pb = await node.dag.get(cid);
//     return { tree, pb }
//   }))
// }

// peerId user

// "minLength": 2,
// "maxLength": 3

// const getRoot = async (node) => {
//   const { id } = await node.id();
//   const state = await node.name.pubsub.state();
//   if (!state.enabled) {
//     throw new Error('ipns pubsub is not enabled, options.EXPERIMENTAL.ipnsPubsub = true');
//   }
//   const [resolved] = await all(node.name.resolve(id))
//   const { value = {} } = await node.dag.get(resolved) || {};
//   return value;
// }

// const getTopics = async (node) => {
//   const { topics = {} } = await getRoot(node);
//   return topics
// }

// const getTopic =  async (node, topicId) => {
//   const{ [topicId]: topic } = await getTopics(node);
//   return topic
// }

// const setTipic = async (node, topicId, value) => {
//   const { topics = {} } = await getRoot(node);
//   const commentCount = tap(topic, `comments.count`, 0)
//   const parent = tap(topic, `comments.last`, null)

//   return node.dag.put({
//     type: 'manifest',
//     topics: {
//       ...topics,
//       [topicCid]: {
//         likes: 1,
//         comments:{
//           count: (isNaN(commentCount) ? 0 : commentCount) + 1,
//           last: cidCborComment.toString(),
//           reactions: [],
//         }
//       }
//     }
//   }, { format: 'dag-cbor', hashAlg: 'sha3-512' })
// }

// const getUserFromToken = (userToken) => {
//   return {
//     // This will check if the user is online
//     peerId: 'QmZiT6CVzd2cJftz8z8RKWXd72h2hf9GN43s5kihBzvqbn',
//     username: 'rubeniskov',
//     avatar: 'https://s.gravatar.com/avatar/1256fe7af685cee65ab930225e803cad?size=496&default=retro',
//   }
// }

// const createCommentPayload = (user, content, {
//   parent = null,
//   index = 0,
//   max = Infinity,
//   min = 0,
// } = {}) => {
//   if (!content) {
//     throw new Error('comment.content can be undefined or empty')
//   }

//   if (content.length < min) {
//     throw new Error(`comment.content.length can't be less than ${min}`)
//   }

//   if (content.length > max) {
//     throw new Error(`comment.content.length can't be more than ${max}`)
//   }

//   return {
//     type: 'comment',
//     cdate: new Date().getTime(),
//     mdate: new Date().getTime(),
//     parent,
//     index,
//     content: `Esto es una prueba de comentario mumero ${index}`,
//     user
//   }
// };
