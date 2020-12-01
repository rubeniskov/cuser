/** @typedef {import('redux').Reducer} Reducer */
/** @typedef {import('redux').StoreEnhancer} StoreEnhancer */
/** @typedef {import('redux').PreloadedState} PreloadedState */
const { createStore, compose, applyMiddleware } = require('redux');
const monitorReducerEnhancer = require('./enhancers/monitorReducerEnhancer');
const createResolveReducer = require('./createResolveReducer');
const loggerMiddleware = require('./middlewares/loggerMiddleware');


/**
 * @typedef {Object} CuserConfigureStoreOptions
 * @prop {PreloadedState} preloadedState
 * @prop {StoreEnhancer} enhancer
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
  const enhancers = [enhancer, middlewareEnhancer, monitorReducerEnhancer].filter(Boolean);
  const composedEnhancers = compose(...enhancers);
  const resolveReducer = createResolveReducer(rootReducer, restOpts);
  return createStore(resolveReducer, preloadedState, composedEnhancers);
}

module.exports = configureStore;