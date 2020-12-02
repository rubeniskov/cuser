const test = require('ava');
const fetch = require('./fetch');

test('should return a fetch function', (t) => {
  t.is(typeof fetch, 'function');
});

test('should works as expected', async (t) => {
  const [data, res] = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  t.is(res.status, 200);
  t.is(typeof data, 'object');
});

test('should raise an error when status > 400', async (t) => {
  try {
    await fetch('https://jsonplaceholder.typicode.com/nonexists')
  } catch([data, res]) {
    t.is(res.status, 404);
    t.is(typeof data, 'object');
  }
});
