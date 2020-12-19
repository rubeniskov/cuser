// @ts-check

/** @typedef {import('./useCuser').CuserHookOptions} CuserHookOptions */

import { useCallback, useMemo } from 'react'
import useCuser from './useCuser';
import usePromiseResolver from './usePromiseResolver';
import useAuth from './useAuth';

/** @typedef {CuserHookOptions} CuserPublishMessageHookOptions */

/**
 *
 * @param {CuserPublishMessageHookOptions} [opts]
 */
const usePublishMessage = (opts) => {
  const { client, topicId } = useCuser(opts);
  const { auth } = useAuth();
  const { data: accessToken } = auth;
  const resolver = useCallback(({ topicId, accessToken, content }) => client.publishMessage(topicId, accessToken, content), [client]);
  const result = usePromiseResolver(resolver, {
    ...opts,
    lazy: true,
    variables: {
      topicId,
      accessToken,
    },
  });

  const publishMessage = useCallback((content) => result.refetch({ variables: { content } }), []);

  return useMemo(() => ({
    result, publishMessage
  }), [result, publishMessage]);
}

export default usePublishMessage;
