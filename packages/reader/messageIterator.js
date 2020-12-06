// @ts-check
/**
 * @typedef {Object} CuserMessageIteratorOptions
 * @prop {String} [key='parent']
 * @prop {Number} [limit=10]
 * @prop {Number} [skip=0]
 * @prop {(value: any, cursor: any) => any} [process=(v) => v]
 */

/**
 * @param {(cursor: any) => Promise<any>} resolve
 * @param {any|Promise<any>} root
 * @param {CuserMessageIteratorOptions} [opts]
 * @returns {() => Promise<IteratorResult<any>>}
 */
const createMessageIteratee = (resolve, root, opts) => {
  const {
    key = 'parent',
    limit = 10,
    skip = 0,
    process = (v, c) => v
  } = { ...opts };

  let cursor, to, current, offset = skip;

  /**
   * @returns {Promise<IteratorResult<any>>}
   */
  const next = async () => {
    let done = true, value;
    if (cursor === undefined) {
      root = await root;
      cursor = 0;
      to = skip + limit;
      current = root;
    }

    if (offset > 0) {
      offset --;
      await next();
    }

    const result = await resolve(current);

    if (result && cursor < to) {
      const pointer = current;
      cursor ++;
      current = result[key];
      done = false;
      value = await process(result, pointer);
    }

    return { done, value }
  }

  return next;
}

/**
 * Create message iterator which traverse resolving root and itertating by the key define by options
 * @param {(cursor: any) => Promise<any>} resolve
 * @param {any|Promise<any>} root
 * @param {CuserMessageIteratorOptions} [opts]
 * @returns {AsyncIterable<any>}
 */
const messageIterator = (resolve, root, opts) => ({
  [Symbol.asyncIterator]() {
    return {
      next: createMessageIteratee(resolve, root, opts)
    }
  }
});

module.exports = messageIterator;
