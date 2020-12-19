// @ts-check

/** @typedef {import('redux').AnyAction} AnyAction */
/** @typedef {import('redux').Reducer} Reducer */
/** @typedef {import('mutant-json').MutantOptions} MutantOptions */
const mutantJson = require('mutant-json');
const tap = require('mutant-json/tap');
const isAlias = require('./isAlias');
const isReducer = require('./isReducer');

const parseAliasReducer = (reducer) => Array.isArray(reducer) ? reducer : [reducer];

const sanitize = value => typeof value === 'string' ? value.replace(/^@(.+)/, '\\@$1') : value

/**
 * @typedef {Object} CuserStoreResolveReducerOptions
 * @prop {Record<string, Reducer>} [aliases={}]
 * @prop {Number} [maxRecursion=10]
 */

/**
 *
 * @param {Reducer} rootReducer
 * @param {CuserStoreResolveReducerOptions & MutantOptions} [opts]
 */
const createResolveReducer = (rootReducer, opts) => {
  const {
    aliases = {},
    maxRecursion = 10,
    ...restOptions
  } = { ...opts };

  const createRecursiveResolveReducer = (rootReducer, recursion = []) => {
    /**
     *
     * @param {any} state
     * @param {AnyAction} action
     */
    const resolveReducer = (state, action) => {
      return mutantJson(rootReducer(state, action), (mutate, value, pointer) => {
        let alias, reducerState, reducerAction = action, reducer = value;
        if (isAlias(reducer)) {
          [alias, reducerState, reducerAction = action] = parseAliasReducer(reducer);
          if (!aliases[alias]) {
            throw new Error(`CuserStore: resolve-reducer missing reducer ${alias}`);
          }

          reducer = aliases[alias];
        }

        if (isReducer(reducer)) {
          if (recursion.filter((red) => red === reducer).length > maxRecursion) {
            throw new Error(`CuserStore: resolve-reducer max recursion "${maxRecursion}" reached "${pointer}" for "${alias || reducer.toString()}"`);
          }
          reducer = createRecursiveResolveReducer(reducer, recursion.concat(reducer));
          value = reducer(reducerState || tap(state, pointer), reducerAction);
          console.log(sanitize(value));
          mutate({
            value: sanitize(value)
          });
        }
      }, {
        test: ([_, value]) => isAlias(value) || isReducer(value),
        promises: false,
        ...restOptions
      });
    }
    return resolveReducer;
  }

  return createRecursiveResolveReducer(rootReducer);
}

module.exports = createResolveReducer;
