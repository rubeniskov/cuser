// @ts-check

/** @typedef {import('redux').PreloadedState<String|GraphRoot>} PreloadedState */
/** @typedef {import('redux').Action} Action */
/** @typedef {import('@cuser/proto/graphs').GraphRoot} GraphRoot */
/** @typedef {import('./createStore').CuserStore} CuserStore */
/** @typedef {import('./enhancers/createSerializeEnhancer').CuserSerializeEnhancerOptions} CuserSerializeEnhancerOptions */

const createStore = require('./createStore');
const createSerializeEnhancer = require('./enhancers/createSerializeEnhancer');
const rootReducer = require('./reducers');

/**
 * @typedef {CuserSerializeEnhancerOptions} CuserStoreOptions
 */

/**
 * @param {PreloadedState} preloadedState
 * @param {CuserStoreOptions} opts
 * @returns {CuserStore}
 */
const configureStore = (preloadedState, opts) => {
  const {
    patterns = [
      '/topics/*',
      '/topics/*/message',
      '/topics/*/message/**/user',
      '/topics/*/message/**/parent',
      '/topics/*/message/**/content',
      '/topics/*/message/**/content/data',
      '/topics/*/message/**/content/**/parent'
    ],
    processPattern = (pointer, { payload: { topicId = null } = {} } = {}) => pointer.replace('/topics/*', `/topics/${topicId}`),
    ...restOpts
  } = {
    ...opts
  }

  return createStore(rootReducer, preloadedState, createSerializeEnhancer(patterns, {
    processPattern,
    ...restOpts
  }))
};

module.exports = configureStore;
