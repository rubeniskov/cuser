import { useCallback, useEffect, useMemo } from 'react';
import useCuser from './useCuser';
import usePromiseResolver from './usePromiseResolver';

const useMessages = ({
  subscribe = true,
  ...restOpts
} = {}) => {

  const { client, topicId } = useCuser(restOpts);
  const resolver = ({ topicId, ...resVars }) => client.getMessagesEdges(topicId, resVars);
  const updateQuery = useCallback(({ edges = [], ...restState } = {}, { fetchMoreResult }) => ({
    ...restState,
    ...fetchMoreResult,
    edges: [...edges, ...fetchMoreResult.edges]
  }), []);

  const result = usePromiseResolver(resolver, {
    ...restOpts,
    variables: {
      topicId
    }
  });

  useEffect(() => {
    if (subscribe) {
      const subscription = result.subscribeToMore({
        subscriber: ({ topicId }, listener) => client.subscribe(topicId, listener),
        updateQuery: (prev, { subscriptionData: { topicId, value } }) => {
          const first = prev && prev.edges[0];
          if (first) {
            return client.getMessagesEdges(topicId, {
              rootId: value.replace(/^\/ipfs\//, ''),
              // rootId: evt.value,
              limit: prev.edges.length
            });
          }
          return prev;
        }
      });

      return () => subscription.unsubcribe();
    }
  }, [subscribe, updateQuery]);

  useEffect(() => {
    if (result.data && result.data.length === 0) {
      result.startPolling();
      return () => result.stopPolling();
    }
  }, [result.data && result.data.length === 0])

  const wrappedFetchMore = useCallback(() => {
    const data = result.data || { edges: []};
    const last = data.edges[data.edges.length - 1] || {};
    result.fetchMore({
      variables: { after: last.cursor },
      updateQuery
    });
  }, [result, updateQuery]);

  return useMemo(() => ({
    ...result,
    fetchMore: wrappedFetchMore
  }), [result, wrappedFetchMore]);
}

export default useMessages;
