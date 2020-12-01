const configureStore = require('./configureStore');
const createSerializeEnhancer = require('./enhancers/createSerializeEnhancer');
const rootReducer = require('../reducers');
const reducerAliases = require('../reducers/aliases');

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

const sealReducer = (state, { type }, { serialize, isSerializable }) => {
  if (serialize && type === TYPE_ACTION_SEAL && isSerializable(state)) {
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
    isSerializable: () => { throw new Error('isSerializable not yet implemented') },
    processMap: (pointer, { payload: { topicId } }) => pointer.replace('/topics/*', `/topics/${topicId}`),
    mapping: {
      '/topics/*': '@topic',
      '/topics/*/message': '@message',
      '/topics/*/message/user': '@user',
      '/topics/*/message/content': '@content'
    },
    aliases: {
      ...reducerAliases,
      '@topic': wrapReducer(reducerAliases['@topic'], opts),
      '@message': wrapReducer(reducerAliases['@message'], opts),
      '@user': wrapReducer(reducerAliases['@user'], opts),
      '@content': wrapReducer(reducerAliases['@content'], opts),
    },
    ...opts
  }

  return configureStore(wrapReducer(rootReducer, copts), {
    enhancer: createSerializeEnhancer(copts),
    ...copts,
  })
};
