// @ts-check
import { useContext, createContext } from 'react';

const cacheContext = createContext({});

const useCacheRef = (hash) => {
  const cacheCtx = useContext(cacheContext);
  return {
    set current(value) {
      cacheCtx[hash] = value;
    },
    get current() {
      return cacheCtx[hash];
    }
  }
}

export default useCacheRef;
