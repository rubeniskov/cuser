const formatErr = require('./formatErr');

const assert = (assertion, ...args) => {
  if (!assertion) throw formatErr(...args);
}

module.exports = assert;
