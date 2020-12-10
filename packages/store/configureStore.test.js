const test = require('ava');
const crypto = require('crypto');
const loremIpsum = require("lorem-ipsum").loremIpsum;

const createAction = require('./utils/createAction');
const createUsers = require('./testing/createUsers');
const createSerializer = require('./testing/createSerializer');

const {
  TYPE_ACTION_PUBLISH_MESSAGE,
  TYPE_ACTION_DELETE_MESSAGE
} = require('./types/actions');

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
  t.context.serializer = createSerializer({}, (value) => Promise.resolve(value));
});

test('should create the store with defaults', (t) => {
  const store = configureStore();

  t.is(typeof store.dispatch, 'function');
});

test('should create the store and serialize data', async (t) => {

  const { serializer: { cache, ...storeOpts } } = t.context;

  const store = configureStore(undefined, storeOpts);

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

  const { serializer: { cache, ...storeOpts } } = t.context;

  const store = configureStore(undefined, storeOpts);

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
