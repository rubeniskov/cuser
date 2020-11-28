const { createStore, compose, applyMiddleware } = require('redux');
const monitorReducerEnhancer = require('./monitorReducerEnhancer');
const createResolveReducer = require('./createResolveReducer');
const loggerMiddleware = require('./loggerMiddleware');

const configureStore = (reducer, {
  enhancer,
  preloadedState,
  ...restOpts
} = {}) => {

  const middlewares = [loggerMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [enhancer, middlewareEnhancer, monitorReducerEnhancer].filter(Boolean);
  const composedEnhancers = compose(...enhancers);
  const resolveReducer = createResolveReducer(reducer, restOpts);
  return createStore(resolveReducer, preloadedState, composedEnhancers);
}


module.exports = configureStore;
