// @ts-check

/** @typedef {import('../utils/observableQuery').QueryResult} QueryResult */
/** @typedef {import('../utils/observableQuery').QueryOptions} QueryOptions */

import { useEffect, useState, useMemo } from 'react';
import objectHash from 'object-hash';
import ObservableQuery from '../utils/observableQuery';
import useCacheMemo from './useCacheMemo';

/**
 * @typedef {Object} PromiseResolverOptions
 * @prop {Boolean} [suspense=false]
 * @prop {Boolean} [lazy=false]
 */

/** @typedef {PromiseResolverOptions & QueryOptions} PromiseResolverHookOptions */

/**
 *
 * @param {(variables: Record<string, any>) => Promise<any>} resolver
 * @param {PromiseResolverHookOptions} opts
 */
const usePromiseResolver = (resolver, {
  suspense = false,
  lazy = false,
  variables = {},
  ...restOpts
} = {}) => {
  const [responseId, setResponseId] = useState(0);

  const fetchObservable = useCacheMemo(() => new ObservableQuery(resolver, {
    ...restOpts,
    variables,
    loading: !lazy
  }), [resolver]);

  useEffect(() => {
    const invalidateCurrentResult = () => {
      setResponseId(x => x + 1);
    };

    const subscribe = () => {
      const subscription = fetchObservable.subscribe(
        invalidateCurrentResult,
        () => {
          invalidateCurrentResult();
          process.nextTick(subscribe);
        },
      );
      return () => {
        subscription.unsubscribe();
      };
    }

    return subscribe();
  }, [fetchObservable]);

  useEffect(() => {
    fetchObservable.setVariables(variables);
    if (!lazy) {
      process.nextTick(() => fetchObservable.refetch());
    }
  }, [objectHash(variables)])

  const currentResult = useMemo(() => {
    /** @type {QueryResult} */
    const result = fetchObservable.getCurrentResult();
    const helpers = {
      fetchMore: fetchObservable.fetchMore.bind(fetchObservable),
      subscribeToMore: fetchObservable.subscribeToMore.bind(fetchObservable),
      refetch: fetchObservable.refetch.bind(fetchObservable),
      clean: fetchObservable.clean.bind(fetchObservable),
      startPolling: fetchObservable.startPolling.bind(fetchObservable),
      stopPolling: fetchObservable.stopPolling.bind(fetchObservable),
    }

    return {
      ...helpers,
      ...result
    }
  }, [fetchObservable, responseId]);

  if (suspense && currentResult.loading) {
    throw fetchObservable.result();
  }

  return currentResult;
};

export default usePromiseResolver;
