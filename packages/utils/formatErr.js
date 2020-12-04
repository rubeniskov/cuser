const format = require('util').format;

/**
 * Formats an error like sprintf
 * @param  {...any} args
 * @example
 * ```javascript
 * formatErr('messsage error with argument %s', 'foo')
 * formatErr(TypeError, 'messsage error with argument %s and custom Error constructor', 'foo')
 * ```
 */
const formatErr = (...args) => {
  let Err = Error;
  if (typeof args[0] !== 'string') {
    Err = args.shift();
  }
  return new Err(format(...args));
}

module.exports = formatErr;
