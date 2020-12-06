const { version } = require('./package.json');

const defaults = {
  secret: process.env.SECRET,
  port: process.env.PORT || 3000,
  host: process.env.HOST || '127.0.0.1',
  cors: false,
  mount: `/api/v${version.split('.')[0]}`,
  auth: 'auth',
  rest: true,
  gql: true,
  verbose: false,
}

module.exports = defaults;
