const test = require('ava');
const crypto = require('crypto');
const loremIpsum = require("lorem-ipsum").loremIpsum;

const createAction = require('./utils/createAction');
const createUsers = require('./testing/createUsers');

const {
  TYPE_ACTION_PUBLISH_MESSAGE,
  TYPE_ACTION_DELETE_MESSAGE
} = require('./rtypes/actions');

const configureStore = require('./configureStore');
const md5 = (data) => crypto.createHash('md5').update(typeof data === 'string' ? data : JSON.stringify(data)).digest("hex");
const getLastTopicMessageFromCache = (cache, topicId, hash) => {
  const messageId = cache[cache[hash].topics[topicId]].message;
  if (messageId === null) return messageId;
  return cache[messageId];
};

let users;

test.before((t) => {
  users = createUsers(5);
  t.log('users created', users);
});

test.beforeEach((t) => {
  const cache = t.context.cache = {};
  t.context.serialize = (data) => {
    const hash = md5(data);
    cache[hash] = data;
    return Promise.resolve(hash)
  };
  t.context.deserialize = (hash) => Promise.resolve(cache[hash]);
});

test('should create the store with defaults', (t) => {
  const store = configureStore();

  t.is(typeof store.dispatch, 'function');
});

test('should create the store and serialize data', async (t) => {

  const {
    cache,
    serialize,
    deserialize
  } = t.context;

  const store = configureStore(undefined, {
    serialize, deserialize
  });

  const data = loremIpsum();
  const topicId = 'CUSTOM_TOPIC_ID';

  const hash_state1 = await store.dispatch(createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
    topicId,
    user: users[0],
    content: {
      data
    }
  }));

  t.is(Object.entries(cache).length, 6);

  const hash_state2 = await store.dispatch(createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
    topicId,
    user: users[0],
    content: {
      data
    }
  }));

  t.is(Object.entries(cache).length, 10);
  // console.log(JSON.stringify(cache, null, 2));
  // console.log(cache);
  // t.is(getLastTopicMessageFromCache(cache, topicId, hash_state1).parent, null);
  // console.log(JSON.stringify(cache, null, 2));
  t.pass();
  // TODO hash parent
  // t.is(typeof getMessageFromCache(hash_state2).parent, 'string');
});

test('should delete a message', async (t) => {

  const {
    cache,
    serialize,
    deserialize
  } = t.context;

  const store = configureStore(undefined, {
    serialize, deserialize
  });

  const data = loremIpsum();
  const topicId = 'CUSTOM_TOPIC_ID';

  const hash_state1 = await store.dispatch(createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
    topicId,
    user: users[0],
    content: {
      data
    }
  }));

  t.is(Object.entries(cache).length, 6);
  let message = getLastTopicMessageFromCache(cache, topicId, hash_state1);

  t.log('message stored!', message);
  const hash_state2 = await store.dispatch(createAction(TYPE_ACTION_DELETE_MESSAGE, {
    topicId,
    user: users[0],
    messageId: message.id
  }));

  message = getLastTopicMessageFromCache(cache, topicId, hash_state2);
  t.log('message deleted!', message);
  t.is(message, null);
});
