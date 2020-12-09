const minimatch = require('minimatch');

const match = (pattern, pointer) => minimatch(pointer, pattern);

module.exports = match;
