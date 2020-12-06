// @ts-check
/** @typedef {import('redux').Reducer} Reducer */
/** @typedef {import('redux').StoreEnhancer} StoreEnhancer */
const { createStore, compose, applyMiddleware } = require('redux');
const monitorReducerEnhancer = require('./enhancers/monitorReducerEnhancer');
const createResolveReducer = require('./createResolveReducer');
const loggerMiddleware = require('./middlewares/loggerMiddleware');


/**
 * @typedef {Object} CuserConfigureStoreOptions
 * @prop {any} [preloadedState]
 * @prop {StoreEnhancer} [enhancer]
 */


/**
 * Creates a store wrapping the default cuser enhancers
 * @param {Reducer} rootReducer
 * @param {CuserConfigureStoreOptions} param1
 */
const configureStore = (rootReducer, {
  preloadedState,
  enhancer,
  ...restOpts
} = {}) => {

  const middlewares = [loggerMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducerEnhancer, enhancer].filter(Boolean);
  const composedEnhancers = compose(...enhancers);
  const resolveReducer = createResolveReducer(rootReducer, restOpts);
  return createStore(resolveReducer, preloadedState, composedEnhancers);
}

module.exports = configureStore;
