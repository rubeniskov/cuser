// @ts-check
/** @typedef {import('redux').Reducer} Reducer */
/** @typedef {import('redux').Action} Action */
const mutateJson = require('mutant-json');
const isPromise = require('is-promise').default;
const debug = require('debug')('cuser:store:serializer');
const {
  TYPE_ACTION_RESOLVED,
  TYPE_ACTION_REHYDRATE,
  TYPE_ACTION_SEAL
} = require('../rtypes/actions');

const serializeActions = [
  TYPE_ACTION_RESOLVED,
  TYPE_ACTION_REHYDRATE,
  TYPE_ACTION_RESOLVED
];

const phases = {
  IDLE: 0,
  SEALING: 1,
  REHYDRATING: 2
}
/**
 * @callback CuserSerializeCheck
 * @param {any} state
 * @returns {Boolean}
 */

/**
 * @typedef {Object} CuserSerializeOptions
 * @prop {CuserSerializeCheck} isSerializable
 * @prop {(state: Object) => Promise<String>} serialize
 */

/**
 * @typedef {Object} CuserDeserializeOptions
 * @prop {CuserSerializeCheck} isDeserializable
 * @prop {(state: String) => Promise<any>} deserialize
 */

/**
 *
 * @param {any} state
 * @param {Object} action
 * @param {CuserDeserializeOptions} opts
 */
const rehydrateReducer = (state, { type }, { deserialize, isDeserializable }) => {
  if (deserialize && type === TYPE_ACTION_REHYDRATE && isDeserializable(state)) {
    return Promise.resolve(deserialize).then(deserialize => deserialize(state));
  }
  return state;
}

/**
 *
 * @param {any} state
 * @param {Object} action
 * @param {CuserSerializeOptions} opts
 */
const sealReducer = (state, { type }, { serialize, isSerializable }) => {
  if (serialize && type === TYPE_ACTION_SEAL && isSerializable(state)) {
    return Promise.resolve(serialize).then(serialize => serialize(state));
  }
  return state;
}



/**
 * @callback CuserSerializeProcessMap
 * @param {String} pointer
 * @param {Object} action
 * @returns {String}
 */

/**
 * @typedef {Record<string, string>} CuserSerializeMapping
 */

/**
 * @typedef {Record<string, Reducer>} CuserSerializeAliases
 */

/**
 * @typedef {Object} CuserSerializeEnhancerOptions
 * @prop {CuserSerializeMapping} [mapping]
 * @prop {CuserSerializeAliases} [aliases]
 * @prop {CuserSerializeProcessMap} [processMap]
 */

 /**
  * @param {CuserSerializeEnhancerOptions & CuserSerializeOptions & CuserDeserializeOptions} opts
  */
const createSerializeEnhancer = (opts) => {
  const {
    mapping,
    aliases,
    processMap = p => p,
    ...restOpts
  } = { ...opts };

  return createStore => (
    rootReducer,
    initialState,
    enhancer,
  ) => {

    let store, phase;

    const deferred = {
      resolve: (resolved) => {}, reject: (err) => {}
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
        const newState = sealReducer(reducer(rehydrateReducer(prevState, action, restOpts), action), action, restOpts);

        mutate(Promise.resolve(newState).then(value => {
          debug("reducer %s %s %s %s", action.type, path, prevState, result);
          return ({ value })
        }));
      }, { nested: true, promise: true, test: processMap(pattern, action) });
    }, state);

    const serializeReducer = (state, action) => {
      if (/@@redux\/INIT/.test(action.type)) {
        if (isPromise(state)) {
          state.then((payload) => store.dispatch({ type: TYPE_ACTION_RESOLVED, payload }));
          return state;
        }
        return rootReducer(state, action)
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
              debug("reducer %s %s %s", TYPE_ACTION_SEAL, '/', serialized);
              return sealReducer(serialized, action, restOpts);
            });
          break;
        case TYPE_ACTION_REHYDRATE:
          phase = phases.REHYDRATING;
          state = applySerializeReducers(shallowMapping, rehydrateReducer(state, action, restOpts), action);
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
      if (!pending.length && !serializeActions.includes(action.type)) {
        process.nextTick(() => {
          debug('dispatching serializer for action %o', action);
          pending.push(action, { type: TYPE_ACTION_SEAL, payload: action.payload });
          store.dispatch({ type: TYPE_ACTION_REHYDRATE, payload: action.payload });
        });
        return state;
      }

      try {
        state = rootReducer(state, action)
      } catch (ex) {
        deferred.reject(ex);
      }

      return Promise.resolve(state).then((payload) => {
        store.dispatch({ type: TYPE_ACTION_RESOLVED, payload });
      });
    }

    store = createStore(serializeReducer, initialState, enhancer);

    store.exec = (action) => {
      return new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
        store.dispatch(action);
      });
    };
    return store;
  }
}

module.exports = createSerializeEnhancer;
