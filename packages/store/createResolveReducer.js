// @ts-check
const mutantJson = require('mutant-json');
const tap = require('mutant-json/tap');
const minimatch = require('minimatch');

const findReducerMappingAlias = (mapping, path) => {
  const map = Object.entries(mapping).filter(([pattern]) => minimatch(path, pattern))[0];
  return map ? map[1] : null;
}

const isAlias = (value) => typeof value === 'string' && value[0] === '@';
const isReducer = (value) => typeof value === 'function';
const match = (pattern, pointer) => minimatch(pointer, pattern);

const createResolveReducer = (rootReducer, {
  aliases = {},
  mapping = {},
  ...restOptions
} = {}) => {
  const pattern = `(${Object.keys(mapping).join('|')})`;

  return (state, action) => {
    return mutantJson(rootReducer(state, action) || {}, (mutate, value, path) => {
      let reducer = findReducerMappingAlias(mapping, path) ||value;
      if (isAlias(reducer)) {
        if (!aliases[reducer]) {
          throw new Error(`resolve-reducer: Missing reducer ${reducer}`);
        }
        reducer = aliases[reducer];
      }

      if (isReducer(reducer)) {
        mutate({
          value: reducer(tap(state, path), action, restOptions)
        });
      }
    }, {
      test: ([pointer, value]) => isAlias(value) || isReducer(value) || match(pointer, pattern),
      ...restOptions
    });
  }
}

module.exports = createResolveReducer;
