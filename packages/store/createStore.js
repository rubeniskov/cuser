// @ts-check
/** @typedef {import('redux').Reducer} Reducer */
/** @typedef {import('redux').Store} Store */
/** @typedef {import('redux').StoreCreator} StoreCreator */
const { createStore: createReduxStore, compose, applyMiddleware } = require('redux');
const monitorReducerEnhancer = require('./enhancers/monitorReducerEnhancer');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

/** @typedef {Store} CuserStore */

/**
 * Creates a store wrapping the default cuser enhancers
 * @param {Reducer} rootReducer
 * @param {Function} enhancer
 * @returns {CuserStore}
 *//**
 * @param {Reducer} rootReducer
 * @param {any} preloadedState
 * @param {Function} enhancer
 * @returns {CuserStore}
*/
const createStore = (rootReducer, preloadedState, enhancer) => {
  if (typeof preloadedState === 'function') {
    enhancer = preloadedState;
    preloadedState = undefined
  }
  const middlewares = [loggerMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducerEnhancer, enhancer].filter(Boolean);
  const composedEnhancers = compose(...enhancers);
  return createReduxStore(rootReducer, preloadedState, composedEnhancers);
}

module.exports = createStore;
