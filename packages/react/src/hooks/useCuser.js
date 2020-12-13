// @ts-check
/** @typedef {import('@cuser/client').CuserClient} CuserClient */

import { useContext } from 'react';
import cuserContext from '../utils/context';
import createCache from '../utils/cache';

const useCuser = (opts) => {

  const {
    client
  } = useContext(cuserContext);
  const cache = createCache();

  if (!client) {
    throw new Error('Client not detected, please set the CuserProvider on top to allow getting the client by context')
  }

  return {
    /** @type {CuserClient} */
    client,
    cache
  }
}

export default useCuser;
