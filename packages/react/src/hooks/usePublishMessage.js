import { useCallback } from 'react'
import useCuser from './useCuser';
import usePromiseResolver from './usePromiseResolver';

const usePublishMessage = (variables) => {
  const { client } = useCuser();
  const resolver = useCallback(({ topicId, content }) => client.publishMessage(topicId, null, content), [client]);
  return usePromiseResolver(resolver, { variables });
}

export default usePublishMessage;
