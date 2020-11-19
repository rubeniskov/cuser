const actions = require('../types/actions')
const iterator = require("./iterator");
const traverse = require("./traverse");
const formatErr = require("./formatErr");
const isPromise = require("./is-promise");
const deepEqual = require('deep-equal');

const actionTypesArray = Object.values(actions);
const createReducer = (mutations) => {
  return (state, action) => {
    if (!/@@redux/.test(action.type) && !actionTypesArray.includes(action.type)) {
      throw Error(`Missing mutation "${action && action.type}" available types "${actionTypesArray}"`)
    }

    if (action && action.type && mutations[action.type]) {
      return mutations[action.type](state, action);
    }

    if (mutations[actions.TYPE_ACTION_DEFAULT]){
      return mutations[actions.TYPE_ACTION_DEFAULT](state, action);
    };

    return state;
  }
}

const tap = (obj, path, defaultValue) => {
  const chunks = path.split(/\./);
  let res = obj;
  for(let i = 0; i < chunks.length; i++) {
    if(!res || !res[chunks[i]] === undefined) {
      break;
    }
    res = res[chunks[i]];
  }
  return res === undefined ? defaultValue : res;
}

const createAction = (type) => (payload) => ({ type, payload });

const bindAction = (reducer, action) => {
  const applyAction = createAction(action);
  return (state, payload) => {
    if (!payload) {
      payload = state;
      state = undefined
    }
    return reducer(state, applyAction(payload))
  }
};

const timestamp = () => new Date().getTime();

const assert = (assertion, ...args) => {
  if (!assertion) throw formatErr(...args);
}

module.exports = {
  ...traverse,
  createReducer,
  createAction,
  bindAction,
  timestamp,
  isPromise,
  tap,
  assert,
  deepEqual,
  it: iterator,
}
