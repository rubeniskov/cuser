const createResolveReducer = require('./createResolveReducer');

const wrapResolveReducerAliases = (aliases = {}, opts) => {
  return Object.entries(aliases).reduce((prev, [alias, reducer]) => {
    return ({
      ...prev,
      [alias]: createResolveReducer(reducer, { ...opts, aliases })
    })
  }, {});
}

module.exports = wrapResolveReducerAliases;
