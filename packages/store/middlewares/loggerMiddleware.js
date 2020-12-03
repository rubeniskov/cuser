// @ts-check
const debug = require('debug')('cuser:store-logger');

const loggerMiddleware = (store) => {
  return (next) => {
    return (action) => {
      debug('dispatching %o', action)
      let result = next(action)
      debug('next state %o', store.getState())
      return result
    }
  }
}

module.exports = loggerMiddleware;
