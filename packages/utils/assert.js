const formatErr = require('./formatErr');

/**
 * Asserts a condition to raise an error when not fullfilled
 * @param  {...any} args
 */
const assert = (assertion, ...args) => {
  if (!assertion) throw formatErr(...args);
}

module.exports = assert;
