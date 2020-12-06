// @ts-check
const debug = require('debug')('cuser:store:monitor');

const monitorReducerEnhancer = createStore => (
  reducer,
  initialState,
  enhancer
) => {
  const monitoredReducer = (state, action) => {
    const start = new Date().getTime();
    const newState = reducer(state, action)
    const end = new Date().getTime();
    const diff = Math.round(end - start);

    debug('reducer process time took %d ms for action %s', diff, action.type)
    return newState
  }

  return createStore(monitoredReducer, initialState, enhancer)
}

module.exports = monitorReducerEnhancer;
