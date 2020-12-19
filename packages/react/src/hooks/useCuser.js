// @ts-check
/** @typedef {import('@cuser/client').CuserClient} CuserClient */
/** @typedef {import('../utils/cache').CacheStore} CacheStore */
/** @typedef {import('events/').EventEmitter} EventEmitter */

import { useContext, useCallback, useMemo } from 'react';
import cuserContext from '../utils/context';
import usePromiseResolver from './usePromiseResolver';

/**
 * @typedef {Object} CuserHookOptions
 * @prop {Boolean} [suspense=true]
 * @prop {CuserClient} [client] cuser client
 * @prop {EventEmitter} [emitter] event emitter
 * @prop {CacheStore} [cache] cache to store internal state data
 * @prop {String} [topicId] topicId whereas the client will take the source of the data
 */

/**
 *
 * @param {CuserHookOptions} [opts]
 */
const useCuser = (opts) => {
  const {
    client: ctxClient,
    emitter: ctxEmitter,
    cache: ctxCache,
    topicId: ctxTopicId
  } = useContext(cuserContext);

  const {
    suspense = true,
    emitter = ctxEmitter,
    cache = ctxCache,
    topicId = ctxTopicId,
    client = ctxClient,
  } = { ...opts }

  if (!topicId) {
    throw new Error('Topic id must be defined, please set the CuserProvider on top to allow getting the client by context or define by props')
  }

  if (!client) {
    throw new Error('Client not detected, please set the CuserProvider on top to allow getting the client by context or define by props')
  }

  return useMemo(() => ({
    /** @type {CuserClient} */
    client,
    /** @type {CacheStore} */
    cache,
    /** @type {EventEmitter} */
    emitter,
    /** @type {String} */
    get topicId() {
      return topicId;
    },
    /** @type {String} */
    get peerId() {
      const result = usePromiseResolver(useCallback(() => client.peerId(), [client]), {
        suspense
      });
      return result.data;
    }
  }), [client, cache]);
}

export default useCuser;
