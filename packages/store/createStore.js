// @ts-check
/** @typedef {import('redux').Store} Store */
/** @typedef {import('redux').Action} Action */
/** @typedef {import('./configureStore').CuserConfigureStoreOptions} CuserConfigureStoreOptions */
/** @typedef {import('./enhancers/createSerializeEnhancer').CuserSerializeEnhancerOptions} CuserSerializeEnhancerOptions */
const configureStore = require('./configureStore');
const createSerializeEnhancer = require('./enhancers/createSerializeEnhancer');
const rootReducer = require('./reducers');
const aliases = require('./reducers/aliases');

// const wrapReducer = (reducer, wrapOpts) => (state, action, reducerOpts) => {
//   const opts = {...wrapOpts, ...reducerOpts};
//   return sealReducer(reducer(rehydrateReducer(state, action, opts), action, opts), action, opts)
// }

/**
 * @typedef {CuserSerializeEnhancerOptions} CuserStoreOptions
 */

/**
 * @typedef {Object} CuserStore
 * @prop {(action: Action) => Promise<any>} exec
 * @prop {() => any} getState
 * @prop {(subscriber: Function) => any} subscribe
 */

/**
 *
 * @param {CuserStoreOptions} opts
 * @returns {Store & CuserStore}
 */
const createStore = (opts) => {
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

  copts.aliases = aliases;

  // copts.aliases = {
  //   ...reducerAliases,
  //   '@topic': wrapReducer(reducerAliases['@topic'], copts),
  //   '@message': wrapReducer(reducerAliases['@message'], copts),
  //   '@user': wrapReducer(reducerAliases['@user'], copts),
  //   '@content': wrapReducer(reducerAliases['@content'], copts),
  //   '@data': wrapReducer(reducerAliases['@data'], copts),
  // };


  return configureStore(rootReducer, {
    enhancer: createSerializeEnhancer(copts),
    ...copts,
  })
};

module.exports = createStore;
