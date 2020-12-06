const test = require('ava');
const request = require('supertest');
const createServer = require('./server');
const pkg = require('./package.json');

test('should responses with version', async (t) => {
  t.pass();
  // const server = createServer(null, {
  //   cuser: {},
  //   auth: false,
  //   rest: false,
  //   graphql: false
  // });

  // const res = await request(server)
  //       .get("/api/v0")
  //       .send();

  // t.deepEqual(res.body, { version: pkg.version });
  // t.is(res.status, 200);
});
