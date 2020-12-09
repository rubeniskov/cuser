// @ts-check
/** @typedef {import('redux').Reducer} Reducer */
/** @typedef {import('redux').AnyAction} AnyAction */
/** @typedef {import('redux').Action} Action */
/** @typedef {import('./createSerializeReducer').CuserStoreSerializeReducerOptions} CuserStoreSerializeReducerOptions */
const mutateJson = require('mutant-json');
const isPromise = require('@cuser/utils/isPromise');
const createSerializeReducer = require('./createSerializeReducer');
// const parseMapping = require('../utils/parseMapping');
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
 * @typedef {object} CuserSerializeOptions
 * @prop {CuserSerializeCheck} [serializable]
 * @prop {(state: object) => Promise<string>} [serialize]
 */

/**
 * @typedef {object} CuserDeserializeOptions
 * @prop {CuserSerializeCheck} [deserializable]
 * @prop {(state: string) => Promise<any>} [deserialize]
 */

/**
 * @callback CuserSerializeProcessMap
 * @param {string} pointer
 * @param {object} action
 * @returns {string}
 */

/**
 * @callback CuserSerializeReducer
 * @param {any} state
 * @param {AnyAction} action
 * @param {object} options
 */

/**
 * @typedef {Array<string | any>} CuserSerializeMappingEntry
*/

/**
 * @typedef {string|CuserSerializeMappingEntry} CuserSerializeMappingAlias
*/

/**
 * @typedef {Record<string, CuserSerializeMappingAlias>} CuserSerializeMapping
 */

/**
 * @typedef {Record<string, CuserSerializeReducer>} CuserSerializeAliases
 */

/**
 * @typedef {CuserStoreSerializeReducerOptions} CuserSerializeEnhancerOptions
 */

/**
 * @param {CuserDeserializeOptions} opts
 */
const createRehydrateReducer = ({ deserialize, deserializable = () => true }) => {
  /**
   * @param {any} state
   * @param {AnyAction} action
   */
  const rehydrateReducer = (state, { type }) => {
    if (deserialize && type === TYPE_ACTION_REHYDRATE && deserializable(state)) {
      return deserialize(state);
    }
    return state;
  }
  return rehydrateReducer;
}

/**
 * @param {CuserSerializeOptions} opts
 */
const createSealReducer = ({ serialize, serializable = () => true }) => {
  /**
   * @param {any} state
   * @param {AnyAction} action
   */
  const sealReducer = (state, { type }) => {
    if (serialize && type === TYPE_ACTION_SEAL && serializable(state)) {
      return serialize(state);
    }
    return state;
  }
  return sealReducer;
}

/**
 * @param {Array<String>} patterns
 * @param {CuserSerializeEnhancerOptions & CuserSerializeOptions & CuserDeserializeOptions} opts
 */
const createSerializeEnhancer = (patterns, opts) => {
  const {
    ...restOpts
  } = {
    deserializable: () => true,
    serializable: () => true,
    serialize: (state) => state,
    deserialize: (state) => state,
    ...opts
  };

  return createStore => (
    rootReducer,
    initialState,
    enhancer,
  ) => {

    let store, dispatch, phase;

    const deferred = {
      resolve: (resolved) => {}, reject: (err) => {}
    }
    const pending = [];

    const sealReducer = createSealReducer(restOpts);
    const rehydrateReducer = createRehydrateReducer(restOpts);
    const serializeReducer = createSerializeReducer(sealReducer, patterns, {
      ...restOpts,
      promise: true,
    });
    const deserializeReducer = createSerializeReducer(rehydrateReducer, patterns, {
      ...restOpts,
      deeper: true,
      promise: true,
    });

    const isPromiseTest = ([,value]) => isPromise(value);

    const enhancedSerializeReducer = (state, action) => {
      if (/@@redux\/INIT/.test(action.type)) {
        if (isPromise(state)) {
          state.then((payload) => dispatch({ type: TYPE_ACTION_RESOLVED, payload }));
          return state;
        }
        return rootReducer(state, action)
      };

      switch (action.type) {
        case TYPE_ACTION_RESOLVED:
          if (pending.length) {
            process.nextTick(() => {
              dispatch(pending.shift());
            });
          } else if (phase === phases.SEALING) {
            deferred.resolve(state);
            debug('resolved state: %s', action.payload);
          }
          return action.payload;
        case TYPE_ACTION_SEAL:
          phase = phases.SEALING;
          state = serializeReducer(state, action)
            .then((serialized) => {
              debug(`performing "${action.type}" on / %s`, serialized);
              return sealReducer(serialized, action);
            });
          break;
        case TYPE_ACTION_REHYDRATE:
          phase = phases.REHYDRATING;
          state = deserializeReducer(rehydrateReducer(state, action), action)
              .then((deserialized) => {
                debug(`performing "${action.type}" on / %s`, deserialized);
                return deserialized;
              });
          break;
        default:
          phase = phases.IDLE;
        break;
      }

      state = mutateJson(state, (mutate, value) => {
        mutate({ value });
      }, isPromiseTest);

      if (isPromise(state)) {
        state.then((payload) => {
          dispatch({ type: TYPE_ACTION_RESOLVED, payload });
        }, deferred.reject)
        return state;
      }

      // Dispatch rehydarte when action detected
      if (!pending.length && !serializeActions.includes(action.type)) {
        process.nextTick(() => {
          debug('dispatching serializer for action %o', action);
          pending.push(action, { type: TYPE_ACTION_SEAL, payload: action.payload });
          dispatch({ type: TYPE_ACTION_REHYDRATE, payload: action.payload });
        });
        return state;
      }

      try {
        state = rootReducer(state, action)
      } catch (ex) {
        deferred.reject(ex);
      }

      return Promise.resolve(state).then((payload) => {
        dispatch({ type: TYPE_ACTION_RESOLVED, payload });
      });
    }

    store = createStore(enhancedSerializeReducer, initialState, enhancer);

    /**
     * Dispatch an action agains the store and returns a promise
     * with serialized state when sealed complete
     * @param {AnyAction} action
     */
    const serialiledDispatch = (action) => {
      if (pending.length) {
        throw new Error('CuserStore: dispatch can be performed if there is a process stil in progress')
      }
      return new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
        dispatch(action);
      });
    };

    dispatch = store.dispatch;
    store.dispatch = serialiledDispatch;

    return store;
  }
}

module.exports = createSerializeEnhancer;
