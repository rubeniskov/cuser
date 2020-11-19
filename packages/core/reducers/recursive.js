const mutateJson = require('mutant-json');

const recursiveReducer = (reducer, opts) => (state, action) => {
  if (typeof state !== 'object') {
    throw new Error(`There's no state available`);
  }

  let value = reducer(state, action);
  if (value !== undefined) {
    return value
  }
  return mutateJson(state, (mutant, current) => {
    value = reducer(current, action);
    if (value !== undefined) {
      mutant({ value });
    }
  }, {
    test: '@parent', once: true,
    ...opts,
  });
}

module.exports = recursiveReducer;
