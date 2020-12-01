const createUser = require('./createUser');
const faker = require('faker');

const createUsers = (length) => new Array(length).fill(null).map(() => createUser(faker.name.findName(), faker.image.avatar()));

module.exports = createUsers;
