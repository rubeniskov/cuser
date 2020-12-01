const test = require('ava');
const formatErr = require('./formatErr');
const assert = require('./assert');
const timestamp = require('./timestamp');
const uuid = require('./uuid');

test('should formatErr return a formated error', (t) => {

  const err = formatErr('%s error', 'message');

  t.true(err instanceof Error);
  t.is(err.message, 'message error');
});

test('should formatErr return a custom formated error', (t) => {

  const err = formatErr(TypeError, '%s error', 'message');

  t.true(err instanceof TypeError);
  t.is(err.message, 'message error');
});

test('should assert works as expected', (t) => {
  assert(true, '%s error', 'message');

  t.throws(()=> {
    assert(false, '%s error', 'message');
  }, {
    message: /message error/
  });
});

test('should timestamp return a number with the right length', (t) => {

  const now = timestamp();
  const len = (now+'').length;
  t.is(typeof now, 'number');
  t.true(len > 7 && len <= 13);
});

test('should uuid return a number with the right format', (t) => {

  const uid = uuid();

  t.is(typeof uid, 'string');
  t.is(uid.length, 36);
  t.is(uid.split('-').length, 5);
});
