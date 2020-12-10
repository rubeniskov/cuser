const test = require('ava');
const faker = require('faker');

const createSerializer = require('../testing/createSerializer');
const createSerializeReducer = require('./createSerializeReducer');

test.beforeEach((t) => {
  t.context.serializer = createSerializer();
});

const createUser = () => ({
  username: faker.internet.userName(),
  avatar: faker.internet.avatar(),
});

test('should return the serialized state and capable of deserialize it', (t) => {
  const { serializer: { cache, serialize, deserialize } } = t.context;
  const state = {
    foo: faker.lorem.sentence(),
    message: {
      id: 1,
      user: createUser(),
      parent: {
        id: 2,
        user: createUser(),
        parent: {
          id: 3,
          user: createUser(),
          parent: null,
          content: {
            parent: null,
            data: faker.lorem.sentence()
          },
        },
        content: {
          parent: {
            parent: null,
            data: faker.lorem.sentence()
          },
          data: faker.lorem.sentence()
        },
      },
      content: {
        parent: null,
        data: faker.lorem.sentence()
      },
    }
  };

  const patterns = [
    '/message',
    '/message/**/user',
    '/message/**/parent',
    '/message/**/content',
    '/message/**/content/data',
    '/message/**/content/**/parent'
  ]

  const serializeReducer = createSerializeReducer(serialize, patterns);

  const deserializeReducer = createSerializeReducer(deserialize, patterns, {
    deeper: true
  });

  const serializedState = serializeReducer(state);

  t.deepEqual(serializedState, {
    foo: state.foo,
    message: Object.keys(cache).pop()
  });

  const deserializedState = deserializeReducer(serializedState);

  t.deepEqual(deserializedState, state);

  t.is(Object.keys(cache).length, 13);

  Object.values(cache).forEach((value) => {
    Object.values(value).forEach((value) => {
      t.true(value === null || typeof value === 'string' || typeof value === 'number')
    });
  });
});
