const crypto = require('crypto');


const md5 = (data) => crypto.createHash('md5').update(typeof data === 'string' ? data : JSON.stringify(data)).digest("hex");

const mapMessage = (id, parent = null) => ({
  id,
  parent,
  message: {
    content: 'Test message id ' + id
  }
})

const genObjectMessages = (length, { hash = md5, parent = null } = {}) => new Array(length).fill().reduce((prev, _, idx) => {

  const value = mapMessage(idx, parent);
  const checksum = hash(value);
  const result = {
    ...prev,
    [checksum]: value
  }

  parent = checksum;

  return result;
}, {});

const genArrayMessages = (cache, offset = 0, limit = 10) => {
  const result = [];
  for (let idx = 0; idx < limit; idx ++) {
    const res = getMesageEntryFromCache(cache, offset - idx);
    if (res)
      result.push(res[1]);
  }
  return result;
};

const getMesageEntryFromCache = (cache, id) => Object.entries(cache).find(([, data]) => data.id === id);

module.exports = {
  md5,
  mapMessage,
  getMesageEntryFromCache,
  genArrayMessages,
  genObjectMessages
}
