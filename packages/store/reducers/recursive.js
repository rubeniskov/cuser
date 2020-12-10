// @ts-check

/** @typedef {import('redux').Reducer} Reducer */
/** @typedef {import('mutant-json').MutantOptions} MutantOptions */

const mutateJson = require('mutant-json');
const isPromise = require('@cuser/utils/isPromise');

/**
 * Creates a recursive reducer for a certain key by, default parent
 * @param {Reducer} reducer
 * @param {MutantOptions} opts
 */
const recursiveReducer = (reducer, opts) => {

  return (state, action) => {
    if (typeof state !== 'object') {
      return state;
    }

    let value = reducer(state, action);
    if (value !== undefined) {
      return value
    }

    return mutateJson(state, (mutate, value) => {
      if (isPromise(value)) {
        return mutate(value.then((value) => {
          if (value !== undefined) {
            return { value };
          }
        }));
      }

      value = reducer(value, action);

      if (value !== undefined) {
        mutate({ value });
      }

    }, {
        test: '@parent', once: true,
        ...opts,
    });
  }
}

module.exports = recursiveReducer;
