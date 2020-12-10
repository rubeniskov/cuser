// @ts-check
/** @typedef {import('redux').AnyAction} AnyAction */
/** @typedef {import('redux').Reducer} Reducer */
/** @typedef {import('@cuser/validator').ValidatorSchema} ValidatorSchema */
const validator = require('@cuser/validator');
const { format } = require('util');
const {
  TYPE_ERROR_INVALID_ACTION
} = require('../types/errors');

/**
 * Creates a state validator reducer
 * @param {ValidatorSchema} schema
 * @param {Reducer} reducer
 */
const wrapReducerAction = (schema, reducer = (state, action) => state) => {
  const validate = validator(schema);
  /**
   * @param {any} state
   * @param {AnyAction} action
   */
  const actionValidateReducer = (state, action) => {
    validate(action, format(TYPE_ERROR_INVALID_ACTION, action.type));
    return reducer(state, action);
  }
  return actionValidateReducer;
}

module.exports = wrapReducerAction;
