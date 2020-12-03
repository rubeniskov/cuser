// @ts-check
const revisionReducer = (state = 1, action) => /UPDATE_/.test(action.type) ? state + 1 : state;

module.exports = revisionReducer;
