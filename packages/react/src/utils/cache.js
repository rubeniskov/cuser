// @ts-check

/**
 * @typedef {Object} CacheStore
 * @prop {(name: String) => any} get
 * @prop {(name: String, value: any) => void} put
 * @prop {(name: String) => void} remove
 * @prop {() => void} clear
 */

/**
 * @returns {CacheStore}
 */
const createCache = () => {
  return {
    get: (name) => {
      const value = localStorage.getItem(name);

      if (value) {
        return JSON.parse(value);
      }
      return undefined
    },
    put: (name, value) => {
      localStorage.setItem(name, JSON.stringify(value));
    },
    remove: (name) => {
      localStorage.removeItem(name);
    },
    clear: () => {
      localStorage.clear();
    }
  }
}

export default createCache;
