import { createContext } from 'react';
import createCache from '../utils/cache';
import createEmitter from '../utils/emitter';

export default createContext({
  emitter: createEmitter(),
  cache: createCache(),
  client: null,
  topicId: null,
});
