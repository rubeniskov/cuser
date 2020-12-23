const faker = require('faker');
const createUser = require('./createUser');

const createTestReducer = (state, { type, payload } = {}) => {
  if (type === 'error') throw new Error(payload);
  return ({
    id: state && state.id ? state.id + 1 : 1,
    user: createUser(),
    parent: state ? state : null,
    content: {
      parent: null,
      data: faker.lorem.sentence()
    },
  });
};

module.exports = createTestReducer;
