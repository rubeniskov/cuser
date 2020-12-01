const Ajv = require('ajv');
const { format } = require('util');
const ajv = new Ajv({schemaId: '$id', allErrors: true, jsonPointers: true});
require('ajv-errors')(ajv);
require('ajv-merge-patch')(ajv);

class ValidationError extends Error {
  constructor(message, v) {
    super(message || 'Invalid schema');
    this.errors = v.errors;
    this.extendedInfo = JSON.stringify(v.errors, null, 4);
  }
}

const createValidator = (schema) => {
  const validate = ajv.compile(schema);
  return (obj) => {
    const valid = validate(obj);
    if (!valid) {
      throw new ValidationError(format('Invalid format %s', obj), validate);
    }
  }
}

module.exports = createValidator;
module.exports.ValidationError = ValidationError;
