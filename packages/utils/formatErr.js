const format = require('util').format;

const formatErr = (...args) => {
  let Err = Error;
  if (typeof args[0] !== 'string') {
    Err = args.shift();
  }
  return new Err(format(...args));
}

module.exports = formatErr;
