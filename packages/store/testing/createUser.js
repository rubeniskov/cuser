const faker = require('faker');

const createUser = (username, avatar) => ({
  peerId: faker.random.alphaNumeric(32),
  username,
  avatar
});

module.exports = createUser;
