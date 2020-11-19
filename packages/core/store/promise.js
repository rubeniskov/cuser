const { compose, applyMiddleware } = require('redux');
const isPromise = require('../utils/is-promise');
const mutantJson = require('mutant-json');

const { TYPE_ACTION_PROMISE_RESOLVED } = require('../types/actions')

const promiseReducer = (state, { type, payload }) => {
  if (type === TYPE_ACTION_PROMISE_RESOLVED) {
    return payload;
  }
  return state;
};

const promiseMiddleware = ({ getState, dispatch }) => {
  return (next) => {
    return (action) => {
      const state = getState();
      if (isPromise(state) && action.type !== TYPE_ACTION_PROMISE_RESOLVED) {
        return state.then((payload) => {
          dispatch({ type: TYPE_ACTION_PROMISE_RESOLVED, payload });
        });
      }
      return next(action);
    }
  }
}

const promiseEnhancer = createStore => (
  reducer,
  initialState,
  enhancer
) => {
  let store;
  const cucuReducer = (state, action) => {
    const { type, payload } = action;

    if (type === TYPE_ACTION_PROMISE_RESOLVED) {
      return payload;
    }

    state = reducer(state, action);

    state = mutantJson(state, (mutate, value) => {
      mutate({ value });
    }, { test: ([,v]) => v && v.then });

    if (isPromise(state) && action.type !== TYPE_ACTION_PROMISE_RESOLVED) {
      return state.then((payload) => {
        store.dispatch({ type: TYPE_ACTION_PROMISE_RESOLVED, payload });
      });
    }

    return state;
  }

  store = createStore(cucuReducer, initialState, enhancer);

  return store;
}


module.exports = {
  promiseReducer,
  promiseMiddleware,
  promiseEnhancer,
}
