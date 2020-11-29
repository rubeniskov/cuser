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

const phases = {
  IDLE: 0,
  SEALING: 1,
  REHYDRATING: 2
}

const createSerializeEnhancer = ({
  mapping,
  aliases,
  isDeserializable
}) => createStore => (
  reducer,
  initialState,
  enhancer,
) => {
  let store, phase;

  const deferred = {
    resolve: () => {}, reject: () => {}
  }
  const pending = [];

  const ipldReducer = (state, action) => {
    if (/@@redux\/INIT/.test(action.type)) {
      if (isPromise(state)) {
        state.then((payload) => store.dispatch({ type: TYPE_ACTION_RESOLVED, payload }));
        return state;
      }
      return reducer(state, action)
    };

    switch (action.type) {
      case TYPE_ACTION_RESOLVED:
        if (pending.length) {
          process.nextTick(() => {
            store.dispatch(pending.shift());
          });
        }

        if (phase === phases.SEALING) {
          deferred.resolve(state);
        }
        return action.payload;
      case TYPE_ACTION_SEAL:
        phase = phases.SEALING;
        state = Object.entries(mapping)
        // Sort first the deepest paths
        .sort(([a], [b]) => b.match(/\//g).length - a.match(/\//g).length)
        .reduce((prev, [ pattern, alias ]) => {
          return mutateJson(prev, (mutate, value) => {
            const reducer = aliases[alias];
            if (!reducer) {
              throw new Error(`Missing reducer for "${alias}"`);
            }
            mutate(Promise.resolve(reducer(value, { type: TYPE_ACTION_SEAL })).then(value => ({ value })));
          }, { nested: true, test: pattern });
        }, state)
        .then((state) => reducer(state, action));
        break;
      case TYPE_ACTION_REHYDRATE:
        phase = phases.REHYDRATING;
        state = Object.entries(mapping)
        // Sort first the shallowest paths
        .sort(([a], [b]) => a.match(/\//g).length - b.match(/\//g).length)
        .reduce((prev, [ pattern, alias ]) => {
          return mutateJson(prev, (mutate, value) => {
            const reducer = aliases[alias];
            if (!reducer) {
              throw new Error(`Missing reducer for "${alias}"`);
            }
            mutate(Promise.resolve(reducer(value, { type: TYPE_ACTION_REHYDRATE })).then(value => ({ value })));
          }, { nested: true, test: pattern });
        }, reducer(state, action));
        break;
      default:
        phase = phases.IDLE;
      break;
    }

    state = mutateJson(state || {}, (mutate, value) => {
      mutate({ value });
    }, ([,value]) => value && value.then);

    if (isPromise(state)) {
      state.then((payload) => {
        process.nextTick(() => {
          store.dispatch({ type: TYPE_ACTION_RESOLVED, payload });
        });
      });
      return state;
    }

    // Dispatch rehydarte when DagLink detected
    if (isDeserializable && isDeserializable(state) && !ipdlActions.includes(action.type)) {
      process.nextTick(() => {
        pending.push(action, { type: TYPE_ACTION_SEAL });
        store.dispatch({ type: TYPE_ACTION_REHYDRATE });
      });
      return state;
    }

    state = Promise.resolve(reducer(state, action));

    if (isPromise(state)) {
      state.then((payload) => {
        store.dispatch({ type: TYPE_ACTION_RESOLVED, payload });
      });
      return state;
    }

    return state;
  }

  store = createStore(ipldReducer, initialState, enhancer);

  store.exec = (action) => {
    return new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
      store.dispatch(action);
    });
  };
  return store;
}

module.exports = createSerializeEnhancer;
