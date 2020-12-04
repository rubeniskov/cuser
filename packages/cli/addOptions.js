// @ts-check

const addOptions = (yargs, opts) => {
  Object.entries(opts).forEach(([name, opt]) => {
    yargs.option(name, opt);
  });
  return yargs;
};

module.exports = addOptions;
