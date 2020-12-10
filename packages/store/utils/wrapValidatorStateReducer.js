// @ts-check
/** @typedef {import('redux').AnyAction} AnyAction */
/** @typedef {import('redux').Reducer} Reducer */
/** @typedef {import('@cuser/validator').ValidatorSchema} ValidatorSchema */
const validator = require('@cuser/validator');
const { format } = require('util');
const {
  TYPE_ERROR_INVALID_STATE
} = require('../types/errors');

/**
 * Creates a state validator reducer
 * @param {ValidatorSchema} schema
 * @param {Reducer} reducer
 */
const wrapValidatorStateReducer = (schema, reducer = (state, action) => state) => {
  const validate = validator(schema);
  /**
   * @param {any} state
   * @param {AnyAction} action
   */
  const stateValidateReducer = (state, action) => {
    const newState = reducer(state, action);
    validate(newState, format(TYPE_ERROR_INVALID_STATE, action.type));
    return newState;
  }
  return stateValidateReducer;
}

module.exports = wrapValidatorStateReducer;
