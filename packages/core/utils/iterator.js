const all = require("it-all");
const { traverseObject, traverseObjectKey } = require('./traverse');

/**
 * Wraps a function iteratior to become an iterable
 * @param {Function} next
 * @returns {Iterable}
 */
const wrapIterator = (next) => ({
  next,
  [Symbol.iterator]: function() { return this; }
});


/**
 * @param {Object} object
 * @param {Object} [opts]
 * @param {Boolean} [opts.recursive] Boolean
 * @returns {Iterable}
 */
const entries = (obj, opts) => {
  return wrapIterator(traverseObject(obj, opts));
};

/**
 *
 * @param {*} obj
 * @param {*} key
 * @param {*} iterator
 */
const key = (obj, key, iterator = traverseObjectKey) => wrapIterator(iterator(obj, key));

module.exports = {
  all,
  entries,
  key,
}

