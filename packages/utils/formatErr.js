const format = require('util').format;

/**
 * Formats an error like sprintf
 * @param  {...any} args
 * @example
 * formatErr('messsage errro with argument %s', 'foo')
 * formatErr(TypeError, 'messsage errro with argument %s and custom Error constructor', 'foo')
 */
const formatErr = (...args) => {
  let Err = Error;
  if (typeof args[0] !== 'string') {
    Err = args.shift();
  }
  return new Err(format(...args));
}

module.exports = formatErr;
