const configureStore = require('./configureStore');
const createSerializeEnhancer = require('./createSerializeEnhancer');
const rootReducer = require('../reducers');
const reducerAliases = require('../reducers/resolvers');

const {
  TYPE_ACTION_REHYDRATE,
  TYPE_ACTION_SEAL
} = require('../types/actions');

const rehydrateReducer = (state, { type }, { deserialize, isDeserializable }) => {
  if (deserialize && type === TYPE_ACTION_REHYDRATE && isDeserializable(state)) {
    return Promise.resolve(deserialize).then(deserialize => deserialize(state));
  }
  return state;
}

const sealReducer = (state, { type }, { serialize, isDeserializable }) => {
  if (serialize && type === TYPE_ACTION_SEAL && !isDeserializable(state)) {
    return Promise.resolve(serialize).then(serialize => serialize(state));
  }
  return state;
}

const wrapReducer = (reducer, wrapOpts) => (state, action, reducerOpts) => {
  const opts = {...wrapOpts, ...reducerOpts};
  return sealReducer(reducer(rehydrateReducer(state, action, opts), action, opts), action, opts)
}

module.exports = (opts) => {
  const copts = {
    isDeserializable: () => { throw new Error('isDeserializable not yet implemented') },
    mapping: {
      '/topics/*': '@topic',
      '/topics/*/message': '@message',
      '/topics/*/message/user': '@user',
      '/topics/*/message/content': '@content'
    },
    aliases: {
      ...reducerAliases,
      '@topic': wrapReducer(reducerAliases['@topic']),
      '@message': wrapReducer(reducerAliases['@message']),
      '@user': wrapReducer(reducerAliases['@user']),
      '@content': wrapReducer(reducerAliases['@content']),
    },
    ...opts
  }

  return configureStore(wrapReducer(rootReducer, copts), {
    enhancer: createSerializeEnhancer(copts),
    ...copts,
  })
}

// configureStore(wrapReducer(rootReducer), {
//   preloadedState,
//   aliases,
//   mapping,
//   resolve: (state) => {
//     if (isDagLink(state)) {
//       return this.dag.then(({ get }) => get(state));
//     }
//     return state
//   },
//   enhancer: createSerializeEnhancer({
//     aliases, mapping
//   })
// })

// preloadedState,
// aliases,
// mapping,
// resolve: (state) => {
//   if (isDagLink(state)) {
//     return this.dag.then(({ get }) => get(state));
//   }
//   return state
// },
// enhancer: createSerializeEnhancer({
//   aliases, mapping
// })
