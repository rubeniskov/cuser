const test = require('ava');
const crypto = require('crypto');
const loremIpsum = require("lorem-ipsum").loremIpsum;

const createAction = require('./utils/createAction');
const createUsers = require('./testing/createUsers');

const {
  TYPE_ACTION_PUBLISH_MESSAGE
} = require('./types/actions');

const createStore = require('./createStore');
const md5 = (data) => crypto.createHash('md5').update(typeof data === 'string' ? data : JSON.stringify(data)).digest("hex");

let users;

test.before((t) => {
  users = createUsers(5);
  t.log('user created', users);
});

test('should create the store with defaults', (t) => {
  const store = createStore();

  t.is(typeof store.exec, 'function');
});

test('should create the store and serialize data', async (t) => {

  const cache = {}

  const store = createStore({
    deserialize: (hash) => cache[hash],
    serialize: (data) => {
      const hash = md5(data);
      cache[hash] = data;
      return hash
    }
  });

  const data = loremIpsum();
  const topicId = 'CUSTOM_TOPIC_ID';
  const getMessageFromCache = (hash) => cache[cache[cache[hash].topics[topicId]].message]

  const hash_state1 = await store.exec(createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
    topicId,
    user: users[0],
    content: {
      data
    }
  }));

  t.is(Object.entries(cache).length, 6);

  const hash_state2 = await store.exec(createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
    topicId,
    user: users[0],
    content: {
      data
    }
  }));

  t.is(Object.entries(cache).length, 10);
  console.log(hash_state1, hash_state2);
  t.is(getMessageFromCache(hash_state1).parent, null);
  // TODO hash parent
  // t.is(typeof getMessageFromCache(hash_state2).parent, 'string');
});
