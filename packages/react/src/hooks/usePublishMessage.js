import { useCallback } from 'react'
import useCuser from './useCuser';
import usePromiseResolver from './usePromiseResolver';

const usePublishMessage = (variables) => {
  const { client } = useCuser();
  const resolver = useCallback(({ topicId, accessToken, content }) => client.publishMessage(topicId, accessToken, content), [client]);
  return usePromiseResolver(resolver, { variables });
}

export default usePublishMessage;
