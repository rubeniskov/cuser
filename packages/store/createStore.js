const configureStore = require('./configureStore');
const createSerializeEnhancer = require('./enhancers/createSerializeEnhancer');
const rootReducer = require('./reducers');
const reducerAliases = require('./reducers/aliases');

const {
  TYPE_ACTION_REHYDRATE,
  TYPE_ACTION_SEAL
} = require('./types/actions');

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
    isDeserializable: () => true,
    isSerializable: () => true,
    processMap: (pointer, { payload: { topicId } }) => pointer.replace('/topics/*', `/topics/${topicId}`),
    ...opts
  }

  copts.mapping = {
    '/topics/*': '@topic',
    '/topics/*/message': '@message',
    '/topics/*/message/user': '@user',
    '/topics/*/message/content': '@content',
    '/topics/*/message/content/data': '@data',
  };

  copts.aliases = {
    ...reducerAliases,
    '@topic': wrapReducer(reducerAliases['@topic'], copts),
    '@message': wrapReducer(reducerAliases['@message'], copts),
    '@user': wrapReducer(reducerAliases['@user'], copts),
    '@content': wrapReducer(reducerAliases['@content'], copts),
    '@data': wrapReducer(reducerAliases['@data'], copts),
  };


  return configureStore(wrapReducer(rootReducer, copts), {
    enhancer: createSerializeEnhancer(copts),
    ...copts,
  })
};
