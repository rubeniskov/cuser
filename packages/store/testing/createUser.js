const faker = require('faker');

const createUser = (username = faker.internet.userName(), avatar = faker.internet.avatar()) => ({
  peerId: faker.random.alphaNumeric(32),
  username,
  avatar
});

module.exports = createUser;
