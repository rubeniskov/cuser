const isAlias = (value) => (typeof value === 'string' && value[0] === '@') || (Array.isArray(value) && isAlias(value[0]));

module.exports = isAlias;
