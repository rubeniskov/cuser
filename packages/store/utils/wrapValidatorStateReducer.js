// @ts-check
const Ajv = require('ajv');
const ajv = new Ajv({schemaId: '$id', allErrors: true, jsonPointers: true});
require('ajv-errors')(ajv);
require('ajv-merge-patch')(ajv);
const { format } = require('util');
const {
  TYPE_ERROR_INVALID_STATE,
} = require('../rtypes/errors');
const isPromise = require('is-promise');

class ValidationError extends Error {
  constructor(message, v) {
    super(message || 'Invalid schema');
    this.errors = v.errors;
    this.extendedInfo = JSON.stringify(v.errors, null, 4);
  }
}

const createValidator = (schema) => {
  return ajv.compile(schema);
}

const wrapReducer = (schema, reducer) => {
  const validate = createValidator(schema);
  return (state, action, opts) => {
    if (typeof state !== 'object' || isPromise(state)) {
      return reducer(state, action, opts);
    }
    const valid = validate(state);
    if (!valid) {
      throw new ValidationError(format(TYPE_ERROR_INVALID_STATE, action.type, schema.$id), validate);
    }
    return reducer(state, action, opts);
  }
}

module.exports = wrapReducer;
