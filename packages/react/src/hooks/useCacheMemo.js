// @ts-check
import objectHash from 'object-hash';
import useCacheRef from './useCacheRef';

const useCacheMemo = (cb, deps = []) => {
  const memoRef = useCacheRef(objectHash(deps.map( v => v.toString())));
  if(memoRef.current) {
    return memoRef.current;
  }

  return memoRef.current = cb();
}

export default useCacheMemo;
