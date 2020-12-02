const test = require('ava');
const fetcher = require('./fetcher');

test('should return a fetcher function', (t) => {
  t.is(typeof fetcher, 'function');
});
