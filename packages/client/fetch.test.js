const test = require('ava');
const fetch = require('./fetch');

test('should return a fetch function', (t) => {
  t.is(typeof fetch, 'function');
});

test('should works as expected', async (t) => {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  t.is(typeof data, 'object');
});

test('should raise an error when status > 400', async (t) => {
  try {
    await fetch('https://jsonplaceholder.typicode.com/nonexists')
  } catch(err) {
    t.truthy(err);
    t.is(typeof err, 'object');
  }
});
