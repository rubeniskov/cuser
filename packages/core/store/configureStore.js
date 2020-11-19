const { createStore, compose, applyMiddleware } = require('redux');
const { promiseMiddleware, promiseReducer, promiseEnhancer } = require('./promise');
const monitorReducerEnhancer = require('./monitorReducerEnhancer');
const createResolveReducer = require('./createResolveReducer');
const mergeReducers = require('./mergeReducers');
const loggerMiddleware = require('./loggerMiddleware');

const configureStore = (reducer, {
  enhancer,
  preloadedState,
  aliases
} = {}) => {

  const middlewares = [loggerMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [enhancer, middlewareEnhancer, monitorReducerEnhancer].filter(Boolean);
  const composedEnhancers = compose(...enhancers);

  const resolveReducer = createResolveReducer(reducer, aliases);
  // const wrappedReducer = mergeReducers(resolveReducer);

  return createStore(resolveReducer, preloadedState, composedEnhancers);
}


module.exports = configureStore;
