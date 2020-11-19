const test = require('ava');
const { ValidationError } = require('../validator');
const messageReducer = require('./message');

test('should throw error when empty action', (t) => {
  t.throws(() => {
    messageReducer();
  }, { instanceOf: Error, message: /Missing mutation/ });
});

test('should throw when action has not the a valid structure', (t) => {
  t.throws(() => {
    messageReducer(null, {
      type: 'CREATE',
      payload: {}
    })
  }, { instanceOf: ValidationError });
});
