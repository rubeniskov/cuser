const formatErr = require('./formatErr');

/**
 * Asserts a condition to raise an error when not fullfilled
 * @param  {...any} args
 * @example
 * ```javascript
 * assert(true, 'should not raise the custom error with args %s', 'foo');
 * assert(false, 'should raise the custom error with args %s', 'foo');
 * ```
 */
const assert = (assertion, ...args) => {
  if (!assertion) throw formatErr(...args);
}

module.exports = assert;
