const mutantJson = require('mutant-json');
const tap = require('mutant-json/tap');
const minimatch = require('minimatch');

const findReducerMapping = (mapping, path) => {
  const map = Object.entries(mapping).filter(([pattern]) => minimatch(path, pattern))[0];
  return map ? map[1] : null;
}

const createResolveReducer = (rootReducer, {
  aliases = {},
  mapping = {},
  ...restOptions
} = {}) => {
  return (state, action) => {
    return mutantJson(rootReducer(state, action) || {}, (mutate, reducer, path) => {

      reducer = findReducerMapping(mapping, path) || reducer;

      if (typeof reducer === 'string' && reducer[0] === '@') {
        if (!aliases[reducer]) {
          throw new Error(`resolve-reducer: Missing reducer ${reducer}`);
        }
        reducer = aliases[reducer];
      }

      if (typeof reducer === 'function') {
        mutate({
          value: reducer(tap(state, path), action, restOptions)
        });
      }
    });
  }
}

module.exports = createResolveReducer;
