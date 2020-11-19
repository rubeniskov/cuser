const isPromise = require('./is-promise');
const { key: itKey } = require('./iterator');

const mutateByType = (value) => typeof value === 'object' ? (Array.isArray(value) ? [ ...value ] : { ...value }) : value;

/**
 * Iterates through the given iterator and applies mutation
 * whereas test option are true. Also works with promises.
 * The iteratee must return an entry of the [path, value]
 *
 * @param {Iterable|Iterator} iterator
 * @param {(target: any) => any} mutate
 * @param {Object} [opts]
 * @param {Boolean} [opts.once] stops when the first test occurried
 * @param {Boolean} [opts.flatten] return flatten the all occurriences instead of nested
 * @param {(target: any) => Boolean} [opts.test] test function to determine when to apply mutation function
 * @param {Promise<any>|any} end
 */
const mutation = (state, iterator, process) => {
  let next = iterator.next ? () => iterator.next() : iterator;
  const mutations = [];
  const newState = mutateByType(state);
  const guess = (key) => /[0-9]+/.test(key) ? [] : {}

  const apply = () => {
    mutations.forEach(([path, value]) => {
      const chunks = path.substring(1).split('/');
      const last = chunks.pop();
      let current = newState;
      for (let chunk of chunks) {
        if (!current.hasOwnProperty(chunk)) return;
        current = current[chunk];
      }
      current[last] = value;
    });
    return newState;
  }

  const mutate = (path, mutated) => {
    mutations.push([path, mutated]);
  }

  const traverse = () => {
    const { value: entry = [], done } = next();
    if (done) return newState;

    if (!Array.isArray(entry) || entry.length < 2) {
      throw new Error('mutation: Unexpected value format, iterator must return an entry Object [path: string, value: any]');
    }

    const [path, value] = entry;

    // if (isPromise(value)) {
    //   return value.then((resolved) => traverse([path, resolved]));
    // }

    process(value, mutate.bind(null, path));

    if (!done) {
      return traverse();
    }

    return value;
  }

  traverse();

  // if (isPromise(result)) {
  //   return result.then(applyMutation);
  // }

  return apply();
};

module.exports = mutation
