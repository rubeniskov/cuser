// @ts-check
/** @typedef {import('redux').Reducer} Reducer */
/** @typedef {import('redux').AnyAction} AnyAction */
/** @typedef {import('redux').Action} Action */
/** @typedef {import('./createSerializeReducer').CuserStoreSerializeReducerOptions} CuserStoreSerializeReducerOptions */

const createSerializeReducer = require('./createSerializeReducer');

const debug = require('debug')('cuser:store:serializer');
const {
  TYPE_ACTION_REHYDRATE,
  TYPE_ACTION_SEAL
} = require('../types/actions');


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
 * @typedef {CuserStoreSerializeReducerOptions & CuserSerializeOptions & CuserDeserializeOptions} CuserSerializeEnhancerOptions
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
 * @param {CuserSerializeEnhancerOptions} opts
 */
const createSerializeEnhancer = (patterns, opts) => {
  const {
    init = false,
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
    let store;

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

    const enhancedSerializeReducer = async (state, action) => {
      state = await state;
      if (!init && /@@redux\/INIT/.test(action.type)) {
        return state;
      }
      debug(`performing "${TYPE_ACTION_REHYDRATE}" on / %s`, state);
      state = await rehydrateReducer(state, { type: TYPE_ACTION_REHYDRATE });
      state = await deserializeReducer(state, { type: TYPE_ACTION_REHYDRATE });
      state = await rootReducer(state, action);
      debug(`performing "${TYPE_ACTION_SEAL}" on / %s`, state);
      state = await serializeReducer(state, { type: TYPE_ACTION_SEAL });
      state = await sealReducer(state, { type: TYPE_ACTION_SEAL });
      return state;
    }

    store = createStore(enhancedSerializeReducer, initialState, enhancer);

    const dispatch = store.dispatch;

    /**
     * Dispatch an action agains the store and returns a promise
     * with serialized state when sealed complete
     * @param {AnyAction} action
     * @returns {Promise<any>}
     */
    const deferredDispatch = async (action) => {
      dispatch(action);
      return store.getState();
    };

    return Object.assign(store, { dispatch: deferredDispatch });
  }
}

module.exports = createSerializeEnhancer;
