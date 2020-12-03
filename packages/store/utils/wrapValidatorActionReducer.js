// @ts-check
const Ajv = require('ajv');
const ajv = new Ajv({schemaId: '$id', allErrors: true, jsonPointers: true});
// ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-04.json"));
require('ajv-errors')(ajv);
require('ajv-merge-patch')(ajv);
const { format } = require('util');
const {
  TYPE_ERROR_INVALID_ACTION
} = require('../rtypes/errors');

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

const wrapReducerAction = (schema, reducer) => {
  const validate = createValidator(schema);
  return (state, action, opts) => {
    const valid = validate(action);
    if (!valid) {
      throw new ValidationError(format(TYPE_ERROR_INVALID_ACTION, action.type), validate);
    }
    return reducer(state, action, opts);
  }
}

module.exports = wrapReducerAction;
