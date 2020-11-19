const mutantJson = require('mutant-json');
const tap = require('mutant-json/tap');

const createResolveReducer = (rootReducer, resolvers = {}) => {
  return (state, action) => {
    return mutantJson(rootReducer(state, action), (mutate, reducer, path) => {
      if (typeof reducer === 'string') {
        if (!resolvers[reducer]) {
          throw new Error(`resolve-reducer: Missing reducer ${reducer}`);
        }
        reducer = resolvers[reducer];
      }

      mutate({
        value: reducer(tap(state, path), action)
      });
    }, {
      test: ([,value]) => typeof value === 'function' || (typeof value === 'string' && value[0] === '@')
    });
  }
}

module.exports = createResolveReducer;
