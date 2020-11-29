const mutateJson = require('mutant-json');
const isPromise = require('is-promise');
const debug = require('debug')('cuser:serializer');
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
  processMap = p => p
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

  const mappingEntries = Object.entries(mapping);
  // Sort first the shallowest paths
  const shallowMapping = mappingEntries
    .sort(([a], [b]) => a.match(/\//g).length - b.match(/\//g).length)
  // Sort first the deepest paths
  const deeperMapping = [...shallowMapping].reverse();

  const applySerializeReducers = (mapping, state, action) => mapping.reduce((prev, [ pattern, alias ]) => {
    return mutateJson(prev, (mutate, prevState, path, result) => {
      const reducer = aliases[alias];
      if (!reducer) {
        throw new Error(`Missing reducer for "${alias}"`);
      }
      const newState = reducer(prevState, action);
      mutate(Promise.resolve(newState).then(value => {
        debug("reducer %s %s %s %s", action.type, path, JSON.stringify(prevState, null, 2), JSON.stringify(result, null, 2));
        return ({ value })
      }));
    }, { nested: true, test: processMap(pattern, action) });
  }, state);

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
        } else if (phase === phases.SEALING) {
          deferred.resolve(state);
          debug('resolved state: %s', action.payload);
        }
        return action.payload;
      case TYPE_ACTION_SEAL:
        phase = phases.SEALING;
        state = applySerializeReducers(deeperMapping, state, action)
          .then((serialized) => {
            return reducer(serialized, action).then((newState) => {
              debug("reducer %s %s prev: %o new: %o", TYPE_ACTION_SEAL, '/', serialized, newState);
              return newState
            });
          });
        break;
      case TYPE_ACTION_REHYDRATE:
        phase = phases.REHYDRATING;
        state = applySerializeReducers(shallowMapping, reducer(state, action), action);
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
        store.dispatch({ type: TYPE_ACTION_RESOLVED, payload });
      });
      return state;
    }

    // Dispatch rehydarte when action detected
    if (!pending.length && !ipdlActions.includes(action.type)) {
      process.nextTick(() => {
        debug('dispatching serializer for action %o', action);
        pending.push(action, { type: TYPE_ACTION_SEAL, payload: action.payload });
        store.dispatch({ type: TYPE_ACTION_REHYDRATE, payload: action.payload });
      });
      return state;
    }

    return Promise.resolve(reducer(state, action)).then((payload) => {
      store.dispatch({ type: TYPE_ACTION_RESOLVED, payload });
    });
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
