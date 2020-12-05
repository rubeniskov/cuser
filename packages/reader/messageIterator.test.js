const test = require('ava');
const toArray = require('async-iterator-to-array');
const messageIterator = require('./messageIterator');

const {
  genArrayMessages,
  genObjectMessages,
  getMesageEntryFromCache
} = require('./testing');

const cache = genObjectMessages(100);
const resolve = (hash) => cache[hash];

test('should works in a foor loop with default limit=10', async (t) => {
  const [start] = getMesageEntryFromCache(cache, 10);
  const iterator = messageIterator(resolve, start);
  let idx = 10;
  t.plan(10);
  for await (let item of iterator) {
    t.is(item.id, idx--);
  }
});

test('should return a iterator with default limit=10', async (t) => {
  const [start] = getMesageEntryFromCache(cache, 99);
  const actual = await toArray(messageIterator(resolve, start));
  t.deepEqual(actual, genArrayMessages(cache, 99, 10));
});

test('should return a iterator with custom limit', async (t) => {
  const [start] = getMesageEntryFromCache(cache, 99);
  const actual = await toArray(messageIterator(resolve, start, {
    limit: 2
  }));
  t.deepEqual(actual, genArrayMessages(cache, 99, 2));
});

test('should return a iterator skipping 1 item', async (t) => {
  const [start] = getMesageEntryFromCache(cache, 99);
  const actual = await toArray(messageIterator(resolve, start, {
    limit: 2,
    skip: 1
  }));

  t.deepEqual(actual, genArrayMessages(cache, 98, 2));
});

test('should return a iterator returning last 6 items', async (t) => {
  const [start] = getMesageEntryFromCache(cache, 5);
  const actual = await toArray(messageIterator(resolve, start, {
    limit: 10,
  }));
  t.deepEqual(actual, genArrayMessages(cache, 5, 6));
  t.is(actual.length, 6);
});

test('should return a iterator returning last 5 items', async (t) => {
  const [start] = getMesageEntryFromCache(cache, 5);
  const actual = await toArray(messageIterator(resolve, start, {
    limit: 10,
    skip: 1
  }));
  t.deepEqual(actual, genArrayMessages(cache, 4, 5));
  t.is(actual.length, 5);
});

test('should return a iterator returning last 4 items', async (t) => {
  const [start] = getMesageEntryFromCache(cache, 5);
  const actual = await toArray(messageIterator(resolve, start, {
    limit: 10,
    skip: 2
  }));
  t.deepEqual(actual, genArrayMessages(cache, 3, 5));
  t.is(actual.length, 4);
});
