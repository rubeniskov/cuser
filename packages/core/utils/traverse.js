const isPlainObject = require('./is-plain-object');

const isTraversable = (value) => Array.isArray(value) || isPlainObject(value);

const createMatcher = (test) => {
  if (typeof test === 'string') {
    test = new RegExp('lo que sea');
  }

  return test && test.test ? ([k]) => !!k.match(test) : test;
}

const formatJsonPath = (prefix, key) => [prefix, key].join('/');

const entries = (nested, prefix) => {
  const target = [];
  const entries = Object.entries(nested);
  let i, len;
  for(len = entries.length, i = 0; i < len; i++) {
    const path = formatJsonPath(prefix, entries[i][0]);
    const value = entries[i][1];
    const entry = [path, value];
    target.push(entry);
  }

  return target;
}

/**
 * create a function which traverses an object by its keys and values recursively
 *
 * @param {Object} obj
 * @param {Object} [opts]
 * @param {Boolean} [opts.recursive] enable/disable nested arrays and objects recursion
 * @param {Boolean} [opts.flatten] do not return objects or arrays
 * @param {Boolean} [opts.step] the step increment, default 1
 * @param {Boolean} [opts.test] regexp or function to filter properties
 * @returns {() => { value: [string, any], done: Boolean}}
 */
const traverseObject = (obj, opts) => {
  const {
    recursive = true,
    flatten = true,
    test = null,
    step = 1,
  } = { ...opts };

  let filter = createMatcher(test);
  let overall = [];
  let cursor = 0;

  const dive = (value, prefix) => {
    const remain = overall.slice(cursor + 1);

    overall = entries(value, prefix);

    for(let i = 0; i < remain.length; i++) {
      overall.push(remain[i]);
    }
    return overall[cursor = 0];
  }

  dive(obj);

  const next = () => {

    if (cursor < overall.length) {
      let entry = overall[cursor];
      if (recursive) {
        const [prefix, value] = entry || [];
        if (isTraversable(value)) {
          dive(value, prefix);
          if (flatten) {
            return next();
          }
        } else {
          cursor += step;
        }
      } else {
        cursor += step;
      }

      if (typeof filter === 'function' && !filter(entry)) {
        return next();
      }

      return { value: entry, done: false };
    }
    return { done: true };
  };

  return next;
};

const traverseObjectKey = (obj, key) => {
  let cur = { [key]: obj };
  return () => cur[key] !== undefined
    ? { value: cur = cur[key], done: false }
    : { done: true }
  }


module.exports = {
  traverseObjectKey,
  traverseObject,
}
