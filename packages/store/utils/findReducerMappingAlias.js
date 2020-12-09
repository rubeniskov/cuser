const minimatch = require('minimatch');

const findReducerMappingAlias = (mapping, pointer) => {
  const map = Object.entries(mapping).filter(([pattern]) => minimatch(pointer, pattern))[0];
  return map ? map[1] : null;
}

module.exports = findReducerMappingAlias;
