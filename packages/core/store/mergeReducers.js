const mergeReducers = (...reducers) => (state, action) => reducers.reduce((prev, reducer) => reducer(prev, action), state);

module.exports = mergeReducers;
