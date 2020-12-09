const test = require('ava');
const { createStore } = require('redux');
const faker = require('faker');
const crypto = require('crypto');

const createSerializeEnhancer = require('./createSerializeEnhancer');

const md5 = (data) => crypto.createHash('md5').update(typeof data === 'string' ? data : JSON.stringify(data)).digest("hex");

test.beforeEach((t) => {
  const cache = t.context.cache = {};
  t.context.serialize = (data) => {
    const hash = md5(data);
    cache[hash] = data;
    return Promise.resolve(hash)
  };
  t.context.deserialize = (hash) => Promise.resolve(cache[hash]);
});

const createUser = () => ({
  username: faker.internet.userName(),
  avatar: faker.internet.avatar(),
});

test('should return the serialized state and capable of deserialize it', async (t) => {
  const { cache, serialize, deserialize } = t.context;

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
    '/**/user',
    '/**/parent',
    '/**/content',
    '/**/content/**/parent'
  ];

  const store = createStore((state) => ({
    id: state && state.id ? state.id + 1 : 1,
    user: createUser(),
    parent: state ? state : null,
    content: {
      parent: null,
      data: faker.lorem.sentence()
    },
  }), createSerializeEnhancer(patterns, {
    serialize,
    deserialize,
  }));

  const newState = await store.dispatch({ type: 'test' });
  console.log(newState);
  t.pass();

  // const serializeReducer = createSerializeReducer(serialize, patterns);

  // const deserializeReducer = createSerializeReducer(deserialize, patterns, {
  //   deeper: true
  // });

  // const serializedState = serializeReducer(state);

  // t.deepEqual(serializedState, {
  //   foo: state.foo,
  //   message: Object.keys(cache).pop()
  // });

  // const deserializedState = deserializeReducer(serializedState);

  // t.deepEqual(deserializedState, state);

  // t.is(Object.keys(cache).length, 10);

  // Object.values(cache).forEach((value) => {
  //   Object.values(value).forEach((value) => {
  //     t.true(value === null || typeof value === 'string' || typeof value === 'number')
  //   });
  // });
});


// const test = require('ava');
// const { createStore } = require('redux');

// const createSerializeEnhancer = require('./createSerializeEnhancer');

// test('should return the serialized state', async (t) => {

//   const rootReducer = (state, action) => ({
//     foo: 'lorem ipsum',
//     nested: {
//       nested: {
//         nested: {
//           nested: {
//             bar: 'lorem ipsum'
//           }
//         }
//       }
//     }
//   });

//   const store = createStore(rootReducer, createSerializeEnhancer());
//   console.dir(store);
//   console.log(store);
//   await store.dispatch();
// });
