const test = require('ava');
const createValidator = require('.');

test('should expose ValidationError class', (t) => {
  const { ValidationError } = createValidator;
  t.truthy(ValidationError);
});


test('should raise an error when object has not a valid schema', (t) => {
  const validate = createValidator({
    type: 'object'
  })

  t.throws(() => {
    validate([]);
  }, {
    message: /Invalid format/
  });
});

test('should works without errors', (t) => {
  const validate = createValidator({
    type: 'object'
  })

  validate({});
  t.pass();
});


test('should raise an error with errors property', (t) => {
  const validate = createValidator({
    type: 'object'
  });

  try {
    validate([]);
  } catch(ex) {
    t.deepEqual(ex.errors, [
      {
        dataPath: '',
        keyword: 'type',
        message: 'should be object',
        params: {
          type: 'object',
        },
        schemaPath: '#/type',
      },
    ])
  }
});
