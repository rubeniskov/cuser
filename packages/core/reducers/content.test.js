const test = require('ava');
const { ValidationError } = require('../validator');
const contentReducer = require('./content');

test('should throw error when empty action', (t) => {
  t.throws(() => {
    contentReducer();
  }, { instanceOf: Error, message: /Missing mutation/ });
});

test('should throw when action has not the a valid structure', (t) => {
  t.throws(() => {
    contentReducer(null, {
      type: 'CREATE',
      payload: {}
    })
  }, { instanceOf: ValidationError });
});
