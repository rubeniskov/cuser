import { useMemo, useEffect, useState, useCallback } from 'react';
import { suspendPromise } from '../utils/suspense';

const usePromiseResolver = (resolver, {
  lazy = true,
  suspense = false,
  variables = {},
  data,
  merge = (_, data) => data
} = {}) => {
  const [result, setResult] = useState({ data, loading: !lazy });

  const doFetch = useCallback((fetchVariables) => {
    setResult({ ...result, loading: true });
    resolver({ ...variables, ...fetchVariables })
      .then((data) => {
        setResult({ data: merge(result.data, data), loading: false });
      }, (error) => {
        setResult({ error, loading: false });
      });
  }, [resolver, result, ...Object.values(variables)]);

  useEffect(() => {
    if (!lazy) doFetch();
  }, [lazy]);

  if (suspense && result.loading) {
    suspendPromise(new Promise((resolve) => !result.loading && resolve())).read();
  }

  const mergeData = useCallback((cb) => setResult({ ...result, data: cb(result.data) }), [result])
  const fetchMore = useCallback((opts) => doFetch(opts), [doFetch]);
  const clean = useCallback(() => setResult({ ...result, data: undefined }), [result]);

  const api = useMemo(() => ({
    ...result,
    fetchMore,
    mergeData,
    clean
  }), [result, fetchMore, mergeData])

  return [doFetch, api];
};

export default usePromiseResolver;
