// @ts-check
const actions = require('../rtypes/actions');
const actionTypesArray = Object.values(actions);

const createReducer = (mutations) => {
  return (state, action, opts) => {
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
      return reducer(state, action, opts);
    }
    return state;
  }
}


module.exports = createReducer;
