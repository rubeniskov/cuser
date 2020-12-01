const format = require('util').format;

const formatErr = (...args) => {
  let Err = Error;
  if (typeof args[0]  !== 'string') {
    Err = args.pop();
  }

  return new Error(format(...args));
}

module.exports = formatErr;
