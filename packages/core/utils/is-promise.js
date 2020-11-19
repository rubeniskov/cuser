const isPromise = (promise) => {
  return !!promise && typeof promise.then === 'function'
}

module.exports = isPromise;
