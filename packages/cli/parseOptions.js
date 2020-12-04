// @ts-check

/**
 * Parses yargs options normalizing the kebab case options to nested properties
 * @param {Object} argv
 * @param {String} [prefix]
 */
const parseOptions = (argv, prefix) => Object.entries(argv).reduce((prev, [name, value]) =>
  (prefix
      // Ignore non prefixed options when prefix defined
      ? name.indexOf(prefix) !== 0
      // Ignore prefixed
      : /[-]/.test(name))
  // Ignore camelCase
  || /[$A-Z]/.test(name)
  // Ignore aliases
  || name.length === 1
  ? prev
  : ({
    ...prev,
    [name.replace(prefix, '')]: parseOptions(argv, name + '-') || value
  }), null);

module.exports = parseOptions;
