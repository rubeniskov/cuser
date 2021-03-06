const test = require('ava');
const os = require('os');
const path = require('path');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
const createKeygen = require('./keygen');
const ipfs = require('ipfs');
const createCore = require('@cuser/core');

test.before(async (t) => {
  const repo = path.join(os.tmpdir(), 'cuser_testing_pubsub');
  await rimraf(repo);
  const node = t.context.node = await ipfs.create({
    repo,
  });
  t.log(`starting ipfs node using repo ${repo}`);
  t.context.core = createCore(node);
});

test.after(async (t) => {
  t.log(`stoping ipfs`);
  await t.context.node.stop();
});

test('should generate a privateKey and publicKey from ipfs', async (t) => {
  const { core } = t.context;
  const secret = 'secret_phrase';
  const keygen = createKeygen(core, secret);
  const keys = await keygen.generateKeys();
  t.is(typeof keys.privateKey, 'string');
  t.is(typeof keys.publicKey, 'string');
  t.regex(keys.privateKey, /^-----BEGIN ENCRYPTED PRIVATE KEY-----/);
  t.regex(keys.privateKey, /-----END ENCRYPTED PRIVATE KEY-----\r\n$/);
  t.regex(keys.publicKey, /^-----BEGIN PUBLIC KEY-----/);
  t.regex(keys.publicKey, /-----END PUBLIC KEY-----\r\n$/);
});
