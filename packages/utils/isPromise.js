const isPromise = (value) => typeof value === 'object' && value && typeof value.then === 'function';

module.exports = isPromise;
