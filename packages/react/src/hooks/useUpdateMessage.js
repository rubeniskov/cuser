import { useCallback, useMemo } from 'react'
import useCuser from './useCuser';
import usePromiseResolver from './usePromiseResolver';
import useAuth from './useAuth';

const useUpdateMessage = (opts) => {
  const { client, topicId } = useCuser(opts);
  const { auth } = useAuth();
  const { data: accessToken } = auth;
  const resolver = useCallback(({ topicId, accessToken, messageId, content }) => client.updateMessage(topicId, accessToken, messageId, content), [client]);
  const result = usePromiseResolver(resolver, {
    ...opts,
    lazy: true,
    variables: {
      accessToken,
      topicId
    },
  });

  const updateMessage = useCallback((messageId, content) => result.refetch({ variables: { messageId, content } }), []);

  return useMemo(() => ({
    result, updateMessage
  }), [result, updateMessage]);
}

export default useUpdateMessage;
