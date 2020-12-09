// @ts-check
const mutateJson = require('mutant-json');
const isPromise = require('is-promise');

const recursiveReducer = (reducer, opts) => {

  return (state, action, ropts) => {
    console.log(ropts);
    if (typeof state !== 'object') {
      return state;
    }

    let value = reducer(state, action);
    if (value !== undefined) {
      return value
    }

    return mutateJson(state, (mutate, value) => {

      // if (resolve) {
      //   value = resolve(value, action);
      // }
      // @ts-ignore
      if (isPromise(value)) {
        return mutate(value.then((value) => {
          if (value !== undefined) {
            return { value };
          }
        }));
      }

      value = reducer(value, action);

      if (value !== undefined) {
        mutate({ value });
      }

    }, {
        test: '@parent', once: true,
        ...opts,
    });
  }
}

module.exports = recursiveReducer;
