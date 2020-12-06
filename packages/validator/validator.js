// @ts-check
const Ajv = require('ajv');
const { format } = require('util');
const ajv = new Ajv({ schemaId: '$id', allErrors: true, jsonPointers: true });
require('ajv-errors')(ajv);
require('ajv-merge-patch')(ajv);

/**
 * Validator error class with nested errors
 */
class ValidationError extends Error {
  /**
   *
   * @param {*} [message]
   * @param {import('ajv').ValidateFunction} [validator]
   */
  constructor(message, validator) {
    super(message || 'Invalid schema');
    this.errors = validator && validator.errors;
    this.extendedInfo = JSON.stringify(this.errors, null, 4);
  }
}

/**
 * Creates a validator which raise a ValidationError when the object doesn't fit the schema
 */
const createValidator = (schema) => {
  const ajvValidate = ajv.compile(schema);

  /**
   * @param {Object} obj
   */
  const validate = (obj) => {
    const valid = ajvValidate(obj);
    if (!valid) {
      throw new ValidationError(format('Invalid format %s', obj), ajvValidate);
    }
  }

  return validate;
}

module.exports = createValidator;
module.exports.ValidationError = ValidationError;
