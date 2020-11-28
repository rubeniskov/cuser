const mutateJson = require('mutant-json');
const isPromise = require('is-promise');

const {
  TYPE_ACTION_RESOLVED,
  TYPE_ACTION_REHYDRATE,
  TYPE_ACTION_SEAL
} = require('../types/actions');

const ipdlActions = [
  TYPE_ACTION_RESOLVED,
  TYPE_ACTION_REHYDRATE,
  TYPE_ACTION_RESOLVED
];

const createSerializeEnhancer = ({
  mapping,
  aliases,
  isDeserializable
}) => createStore => (
  reducer,
  initialState,
  enhancer,
) => {
  let store;

  const ipldReducer = (state, action) => {

    switch (action.type) {
      case TYPE_ACTION_RESOLVED:
        state = action.payload;
        break;
      case TYPE_ACTION_SEAL:
        state = Object.entries(mapping)
        // Sort first the deepest paths
        .sort(([a], [b]) => b.match(/\//g).length - a.match(/\//g).length)
        .reduce((prev, [ pattern, alias ]) => {
          return mutateJson(prev, (mutate, value, path) => {
            const reducer = aliases[alias];
            if (!reducer) {
              throw new Error(`Missing reducer for "${alias}"`);
            }
            mutate(reducer(value, { type: TYPE_ACTION_SEAL }).then(value => ({ value })));
          }, { nested: true, test: pattern });
        }, reducer(state, action));
        break;
    }

    state = mutateJson(state || {}, (mutate, value) => {
      mutate({ value });
    }, ([,value]) => value && value.then);

    if (isPromise(state)) {
      state.then((payload) => {
        process.nextTick(() => store.dispatch({ type: TYPE_ACTION_RESOLVED, payload }));
      });
      return state;
    }

    // Dispatch rehydarte when DagLink detected
    if (isDeserializable && isDeserializable(state) && !ipdlActions.includes(action.type)) {
      process.nextTick(() => store.dispatch({ type: TYPE_ACTION_REHYDRATE }));
    }

    state = reducer(state, action);

    if (isPromise(state)) {
      state.then((payload) => {
        process.nextTick(() => store.dispatch({ type: TYPE_ACTION_RESOLVED, payload }));
      });
    }

    return state;
  }

  store = createStore(ipldReducer, initialState, enhancer);

  return store;
}

module.exports = createSerializeEnhancer;
