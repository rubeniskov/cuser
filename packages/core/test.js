
const rootReducer = require('./reducers');
const { createIterator } = require('traverse-json');

// const schema = require('@cuser/proto/schemas/Content.json');
// const createActionSchema = require('@cuser/proto/schemas/ActionContentCreate.json');
// const updateActionSchema = require('@cuser/proto/schemas/ActionContentCreate.json');
// const { wrapReducer, wrapReducerAction } = require('./validator');

const resolvers = {
  '@topics': require('./reducers/topics'),
  '@user': require('./reducers/user'),
  '@content': require('./reducers/content'),
  '@message': require('./reducers/message'),
  '@topic': require('./reducers/topic'),
  '@timestamp': require('./reducers/timestamp'),
  '@revision': require('./reducers/revision'),
  '@uuid': require('./reducers/uuid'),
}
const createStore = require('./store');
// const { traverseObject } = require('./utils');

const randomHash = (l = 32) => new Array(l).fill().map(() => String.fromCharCode(65 + ~~(Math.random() * 10))).join('');
const avatar = (name) => `http://example.com/avatar/${name}`
const user = (name) => ({
  type: 'user',
  username: name,
  peerId: randomHash(),
  avatar: avatar(name)
});
const action = (type, payload) => ({ type, payload })
const users = ['foo', 'bar'].map(user);

const pretty = (state) => JSON.stringify(state, null, 4);


const store = createStore(rootReducer, { resolvers });
const dispatch = (actions) => (Array.isArray(actions) ? actions : [actions]).forEach((action) => {
  store.dispatch(action);
})


const publishActions = [
  action('PUBLISH_MESSAGE', {
    topicId: 'asdasd',
    content: { data: 'pepe' },
    user: users[0],
  }),
  action('PUBLISH_MESSAGE', {
    topicId: 'asdasd',
    content: { data: 'pepe' },
    user: users[1],
  }),
  action('PUBLISH_MESSAGE', {
    topicId: 'asdasd',
    content: { data: 'pepe' },
    user: users[1],
  }),
  action('PUBLISH_MESSAGE', {
    topicId: 'asdasd',
    content: { data: 'pepe' },
    user: users[1],
  })
].map(({ type, payload }, idx) => ({
  type,
  payload: {
    ...payload,
    content: { data: `message nº: ${idx} ${payload.content.data}` },
  }
}));

store.subscribe(() => {
  // console.log(store.getState());
  console.log(pretty(store.getState()));
});

dispatch(publishActions);

const messageIds = Array.from(createIterator(store.getState(), '**/message/**/id')).map(([,v]) => v);

console.log(messageIds);

const updateActions = [
  action('UPDATE_MESSAGE', {
    topicId: 'asdasd',
    content: { data: 'modified message 1' },
    messageId: messageIds[0],
    user: users[0],
  }),
  action('UPDATE_MESSAGE', {
    topicId: 'asdasd',
    content: { data: 'modified message 2 rev 1' },
    messageId: messageIds[1],
    user: users[1],
  }),
  action('UPDATE_MESSAGE', {
    topicId: 'asdasd',
    content: { data: 'modified message 2 rev 2' },
    messageId: messageIds[2],
    user: users[1],
  }),
  action('UPDATE_MESSAGE', {
    topicId: 'asdasd',
    content: { data: 'modified message 3 rev 2' },
    messageId: messageIds[3],
    user: users[1],
  }),
  action('UPDATE_MESSAGE', {
    topicId: 'asdasd',
    content: { data: 'modified message 1 rev 2' },
    messageId: messageIds[0],
    user: users[0],
  })
]

dispatch(updateActions);



// const entries = traverseJsonIterator(state.topics.asdasd.message, {
//   test: '@parent',
// });

// for (let [ path, value ] of entries) {
//   console.log(path, value);
// }
// console.log();
//

// // const createTraverseKeyIterator = (obj, key) => {
// //   const traverse = () => {
// //     let idx = 0;
// //     let cur = obj;
// //     let keys = Object.keys(keys).map(() => );
// //   }
// //   return () => idx < keys.length
// //     ? { value: cur = cur[key], done: false }
// //     : { done: true }
// //   }

// // const recursiveEntries = (obj) => {
// //   return isPlainObject(obj) ? Object.entries(obj).map(([k, v]) => [k, recursiveEntries(v)]) : obj;
// // }

// const recursiveEntries = (obj) => {

//   let entries = Object.entries(obj);
//   let cursor = 0;

//   const extend = (v, prefix = '') => {
//     const sentries = Object.entries(v);
//     const disp = entries.slice(cursor + 1);
//     entries = sentries.map(([k, v]) => [[prefix, k].filter(Boolean).join('.'), v]).concat(disp);
//     cursor = 0;
//   }

//   const next = () => {
//     if (cursor < entries.length) {
//       let value = entries[cursor];
//       if (Array.isArray(value[1]) || isPlainObject(value[1])) {
//         extend(value[1], value[0]);
//       } else {
//         cursor ++;
//       }
//       return { value, done: false };
//     }

//     return { done: true };
//   };

//   return next;
// }

// const { entries } = require('./utils/iterator');

// // const reduceEntries = (entries) => {
// //   return entries.reduce(() => );
// // }

// // Object.entries(state);

// const ientries = entries({
//   foo: 0,
//   nested: {
//     depth: 1,
//     nested: {
//       depth: 2,
//       nested: {
//         depth: 3,
//         nested: {
//           depth: 4,
//         }
//       }
//     }
//   },
//   bar: 1,
// }, {
//   test: /\/nested/
// });

// for (let [k, v] of ientries) {
//   console.log(k, v);
// }
// // console.log(pretty(state));



// // console.log(state);;

// // console.log(pretty());
