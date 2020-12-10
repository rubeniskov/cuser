// @ts-check

/** @typedef {import('redux').Reducer} Reducer */
const actions = require('../types/actions');
const actionTypesArray = Object.values(actions);

/**
 *
 * @param {Record<string, Reducer>} mutations
 * @returns {Reducer}
 */
const createReducer = (mutations) => {
  return (state, action) => {
    let reducer;

    if (!/@@redux\/INIT/.test(action.type) && !actionTypesArray.includes(action.type)) {
      throw Error(`Missing mutation "${action && action.type}" available types "${actionTypesArray}"`)
    }

    if (action && action.type && mutations[action.type]) {
      reducer = mutations[action.type];
    }

    if (mutations[actions.TYPE_ACTION_DEFAULT]) {
      reducer = mutations[actions.TYPE_ACTION_DEFAULT];
    };

    if (reducer) {
      return reducer(state, action);
    }
    return state;
  }
}


module.exports = createReducer;
