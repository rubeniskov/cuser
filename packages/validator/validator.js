// @ts-check
const Ajv = require('ajv');
const { format } = require('util');
const ajv = new Ajv({ schemaId: '$id', allErrors: true, jsonPointers: true });
require('ajv-errors')(ajv);
require('ajv-merge-patch')(ajv);

/**
 * @typedef {Object} ValidatorSchema
 */

/**
 * Validator error class with nested errors
 */
class ValidationError extends Error {
  /**
   *
   * @param {*} [message]
   * @param {import('ajv').ValidateFunction} [validator]
   * @param {any} [value]
   */
  constructor(message, validator, value) {
    super(message || 'Invalid schema');
    this.errors = validator && validator.errors;
    this.extendedInfo = JSON.stringify(this.errors, null, 4);
    this.value = value;
  }
}

/**
 * Creates a validator which raise a ValidationError when the object doesn't fit the schema
 * @param {ValidatorSchema} schema
 */
const createValidator = (schema) => {
  const ajvValidate = ajv.compile(schema);

  /**
   * @param {Object} value
   * @param {String} [message]
   */
  const validate = (value, message) => {
    const valid = ajvValidate(value);
    if (!valid) {
      throw new ValidationError(message || format('Invalid format %s', value), ajvValidate, value);
    }
  }

  return validate;
}

module.exports = createValidator;
module.exports.ValidationError = ValidationError;
