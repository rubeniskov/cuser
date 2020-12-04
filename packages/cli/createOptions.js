// @ts-check

/**
 * Create options with prefixed and default
 * @param {Object} opts
 * @param {Object} [options]
 * @param {Object} [options.defaults]
 * @param {String} [options.prefix]
 */
const createOptions = (opts, { defaults = {}, prefix = '' } = {}) => Object.entries(opts).reduce((prev, [name, opts]) => ({
  ...prev,
  [prefix + name]: {
    ...opts,
    default: defaults[name] !== undefined? defaults[name] : opts.default,
  }
}), {});

module.exports = createOptions;
