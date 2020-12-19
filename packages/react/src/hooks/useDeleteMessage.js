import { useCallback, useMemo } from 'react'
import useCuser from './useCuser';
import usePromiseResolver from './usePromiseResolver';
import useAuth from './useAuth';

const useDeleteMessage = (opts) => {
  const { client, topicId } = useCuser(opts);
  const { auth } = useAuth();
  const { data: accessToken } = auth;
  const resolver = useCallback(({
    topicId,
    accessToken,
    messageId
  }) => client.deleteMessage(
    topicId,
    accessToken,
    messageId), [
      client
  ]);
  const result = usePromiseResolver(resolver, {
    ...opts,
    lazy: true,
    variables: {
      accessToken,
      topicId
    },
  });

  const deleteMessage = useCallback((messageId) => result.refetch({ variables: { messageId }}), []);

  return useMemo(() => ({
    result, deleteMessage
  }), [result, deleteMessage]);;
}

export default useDeleteMessage;
