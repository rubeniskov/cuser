import { useCallback, useEffect } from 'react';
import useCuser from './useCuser';
import usePromiseResolver from './usePromiseResolver';

const useMessages = (variables, {
  subscribe = true,
  ...restOpts
} = {}) => {

  const { topicId } = variables;
  const { client } = useCuser();
  const resolver = (resVars) => client.getMessagesEdges(topicId, resVars);
  const merge = ({ edges = [], ...restState } = {}, data) => ({
    ...restState,
    ...data,
    edges: [...edges, ...data.edges]
  });

  const [_, result] = usePromiseResolver(resolver, {
    ...restOpts,
    lazy: false,
    variables,
    merge,
  });

  const { fetchMore, mergeData, data } = result;

  useEffect(() => {
    if (subscribe) {
      return client.subscribe(variables.topicId, (evt) => {
        mergeData((prev) => {
          const first = prev.edges[0];
          if (first) {
            return client.getMessagesEdges(topicId, {
              rootId: evt.value.replace(/^\/ipfs\//, ''),
              // rootId: evt.value,
              limit: prev.edges.length
            });
          }
          return prev;
        });
      });
    }
  }, [subscribe, topicId, data, mergeData]);

  const wrappedFetchMore = useCallback(() => {
    const last = data.edges[data.edges.length - 1] || {};
    result.fetchMore({ after: last.cursor });
  }, [fetchMore, data]);

  return {
    ...result,
    fetchMore: wrappedFetchMore
  };
}

export default useMessages;
