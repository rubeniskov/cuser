// @ts-check

/** @typedef {import('redux').Reducer} Reducer */
/** @typedef {import('redux').AnyAction} AnyAction */

const mutateJson = require('mutant-json');
const tap = require('mutant-json/tap');
const minimatch = require('minimatch');
const { createIterator } = require('traverse-json');

/**
 * @typedef {Object} CuserStoreSerializeReducerOptions
 * @prop {Boolean} [deeper=false]
 * @prop {Boolean} [nullable=true]
 * @prop {Boolean} [promise=false]
 * @prop {(pointer: String, action: any) => String} [processPattern]
 */

/**
 * @param {Reducer} reducer
 * @param {Array<string>} patterns
 * @param {CuserStoreSerializeReducerOptions} [opts]
 */
const createSerializeReducer = (reducer, patterns, opts) => {
  const {
    deeper = false,
    nullable = true,
    promise = false,
    processPattern = (a) => a,
  } = { ...opts }
  /**
   * @param {any} state
   * @param {AnyAction} action
   */
  const serializeReducer = (state, action) => {

    const test = ([pointer]) => patterns.some((pattern) => minimatch(processPattern(pointer, action), pattern));

    const entries = deeper ? undefined : Array.from(createIterator(state, {
      nested: true
    }))
    .filter(test)
    .sort(([a], [b]) => b.match(/\//g).length - a.match(/\//g).length)

    const process = (mutate, value, path, result) => {
      value = nullable && value === null ? null : reducer(tap(result, path), action)

      if (promise) {
        return mutate(Promise.resolve(value).then((value) => ({ value })));
      }
      mutate({ value });
    }

    return mutateJson(state, process, {
      test,
      iterator: entries,
      promise
    });
  }

  return serializeReducer;
}

module.exports = createSerializeReducer;
