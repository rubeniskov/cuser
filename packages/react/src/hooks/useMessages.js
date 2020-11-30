import { useEffect } from 'react';
import useCuser from './useCuser';
import usePromiseResolver from './usePromiseResolver';

const useMessages = (variables, {
  subscribe = true
} = {}) => {

  const { client } = useCuser();
  const resolver = ({ topicId, offset, limit }) => client.getMessages(topicId, limit, offset);
  const merge = ({ messages = [], ...restState } = {}, data) => ({
    ...restState,
    ...data,
    messages: [...messages, ...data.messages],
  })

  const [_, result] = usePromiseResolver(resolver, {
      lazy: false,
      variables,
      merge,
  });

  const { mergeData } = result;

  useEffect(() => {
    if (subscribe) {
      return client.subscribe(variables.topicId, (message) => {
        mergeData((prev) => merge({ messages: [ message ]}, prev));
      })
    }
  }, [subscribe, result.data, mergeData]);

  return result;
}

export default useMessages;
