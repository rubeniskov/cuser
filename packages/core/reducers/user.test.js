const test = require('ava');
const { ValidationError } = require('../validator');
const userReducer = require('./user');

test('should throw error when empty action', (t) => {
  t.throws(() => {
    userReducer();
  }, { instanceOf: Error, message: /Missing mutation/ });
});

test('should throw when action has not the a valid structure', (t) => {
  t.throws(() => {
    userReducer(null, {
      type: 'CREATE',
      payload: {}
    })
  }, { instanceOf: ValidationError });
});
