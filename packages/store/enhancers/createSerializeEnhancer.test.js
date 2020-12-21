const test = require('ava');
const { createStore } = require('redux');

const createSerializer = require('../testing/createSerializer');
const createTestReducer = require('../testing/createTestReducer');
const createSerializeEnhancer = require('./createSerializeEnhancer');


test.beforeEach((t) => {
  t.context.rootReducer = createTestReducer;
  t.context.serializer = createSerializer({}, (value) => Promise.resolve(value));
});

const isCacheFlatten = (cache) => {
  return Object.values(cache).some((value) => {
    return Object.values(value).some((value) => {
      return (value !== null && typeof value === 'object') || typeof Array.isArray(value)
    });
  });
}

test('should return the serialized state and capable of deserialize it', async (t) => {
  const { rootReducer, serializer: { cache, ...storeOpts } } = t.context;

  const patterns = [
    '/**/user',
    '/**/parent',
    '/**/content',
    '/**/content/data',
    '/**/content/**/parent'
  ];

  const store = createStore(rootReducer, createSerializeEnhancer(patterns, storeOpts));

  await store.dispatch({ type: 'test' });
  await store.dispatch({ type: 'test' });
  await store.dispatch({ type: 'test' });
  const lastHashState = await store.dispatch({ type: 'test' });

  t.is(cache[lastHashState].id, 4);
  t.is(Object.keys(cache).length, 16);
  t.true(isCacheFlatten(cache));
});

test('should accept a serialized preloadedState', async (t) => {
  const { rootReducer, serializer: { cache, ...storeOpts } } = t.context;

  const patterns = [
    '/**/user',
    '/**/parent',
    '/**/content',
    '/**/content/data',
    '/**/content/**/parent'
  ];

  let store = createStore(rootReducer, createSerializeEnhancer(patterns, storeOpts));

  await store.dispatch({ type: 'test' });
  await store.dispatch({ type: 'test' });
  await store.dispatch({ type: 'test' });
  const lastHashState = await store.dispatch({ type: 'test' });

  t.is(cache[lastHashState].id, 4);
  t.is(Object.keys(cache).length, 16);

  store = createStore(rootReducer, lastHashState, createSerializeEnhancer(patterns, storeOpts));

  const hashState = await store.dispatch({ type: 'test' });

  t.is(cache[hashState].id, 5);
  t.true(isCacheFlatten(cache));
});

test('should accept a promesized serialized preloadedState', async (t) => {
  const { rootReducer, serializer: { cache, ...storeOpts } } = t.context;

  const patterns = [
    '/**/user',
    '/**/parent',
    '/**/content',
    '/**/content/data',
    '/**/content/**/parent'
  ];

  let store = createStore(rootReducer, createSerializeEnhancer(patterns, storeOpts));

  await store.dispatch({ type: 'test' });
  await store.dispatch({ type: 'test' });
  await store.dispatch({ type: 'test' });
  const lastHashState = await store.dispatch({ type: 'test' });

  t.is(cache[lastHashState].id, 4);
  t.is(Object.keys(cache).length, 16);

  store = createStore(rootReducer, Promise.resolve(lastHashState), createSerializeEnhancer(patterns, storeOpts));

  const hashState = await store.dispatch({ type: 'test' });

  t.is(cache[hashState].id, 5);
  t.true(isCacheFlatten(cache));
});

test('should reset the state if reinstances the store without preloadedState', async (t) => {
  const { rootReducer, serializer: { cache, ...storeOpts } } = t.context;

  const patterns = [
    '/**/user',
    '/**/parent',
    '/**/content',
    '/**/content/data',
    '/**/content/**/parent'
  ];

  let store = createStore(rootReducer, createSerializeEnhancer(patterns, storeOpts));

  await store.dispatch({ type: 'test' });
  await store.dispatch({ type: 'test' });
  await store.dispatch({ type: 'test' });
  const hashState1 = await store.dispatch({ type: 'test' });

  t.is(cache[hashState1].id, 4);
  t.is(Object.keys(cache).length, 16);

  store = createStore(rootReducer, createSerializeEnhancer(patterns, storeOpts));

  const hashState2 = await store.dispatch({ type: 'test' });

  t.is(cache[hashState2].id, 1);
  t.is(Object.keys(cache).length, 20);
  t.true(isCacheFlatten(cache));
});
