const crypto = require('crypto');

const md5 = (data) => crypto.createHash('md5').update(typeof data === 'string' ? data : JSON.stringify(data)).digest("hex");

const createSerializer = (cache = {}, wrap = a => a) => {
  const serializable = (state) => state !== undefined;
  const serialize = (data) => {
    const hash = md5(data);
    cache[hash] = data;
    return wrap(hash);
  };
  const deserializable = (state) => typeof state === 'string';
  const deserialize = (hash) => wrap(cache[hash]);


  return {
    cache,
    serialize,
    serializable,
    deserialize,
    deserializable,
  }
}

module.exports = createSerializer;
