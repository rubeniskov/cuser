const test = require('ava');
const createAuth = require('./auth');
const createCore = require('@cuser/core');
const os = require('os');
const path = require('path');
const { CuserAuth } = createAuth;
const { create } = require('ipfs');

const createNode = (name, port) => create({
  repo: path.resolve(os.tmpdir(), name),
  config: {
    Addresses: {
      Swarm: [
        `/ip4/0.0.0.0/tcp/${port}`
      ],
    }
  }
})

test.before(async (t) => {
  const node = createNode('testing_auth', 4001)
  t.context.core = createCore(node);
});

test('should create an instance of CuserAuth', (t) => {
  const { core } = t.context;
  const auth = createAuth(core, 'secret_phrase');
  t.true(auth instanceof CuserAuth);
});

test('should throws and error when payload has not the right format', async (t) => {
  const { core } = t.context;
  const username = 'bob';
  const avatar = 'http://example.com/bob_avatar.png';
  const auth = createAuth(core, 'secret_phrase');

  await t.throwsAsync(() => auth.authenticate({
    username,
    avatar
  }), {
    message: /Invalid format/
  });
});

test('should return a valid accessToken', async (t) => {
  const { core } = t.context;
  const peerId = 'custom_peer_id';
  const username = 'bob';
  const avatar = 'http://example.com/bob_avatar.png';
  const auth = createAuth(core, 'secret_phrase');

  const accessToken = await auth.authenticate({
    peerId,
    username,
    avatar
  });

  t.is(typeof accessToken, 'string');
});

test('should return a decode the accessToken', async (t) => {
  const { core } = t.context;
  const peerId = 'custom_peer_id';
  const username = 'bob';
  const avatar = 'http://example.com/bob_avatar.png';
  const auth = createAuth(core, 'secret_phrase');

  const accessToken = await auth.authenticate({
    peerId,
    username,
    avatar
  });
  const decoded = await auth.decode(accessToken);

  t.is(typeof decoded, 'object');
  t.is(decoded.peerId, peerId);
  t.is(decoded.username, username);
  t.is(decoded.avatar, avatar);
  t.is(typeof decoded.iat, 'number');
});

test('should multiple auth instances allowed to decode the accessToken with the same secret and same node', async (t) => {
  const { core } = t.context;
  const peerId = 'custom_peer_id';
  const username = 'bob';
  const avatar = 'http://example.com/bob_avatar.png';
  const auth1 = createAuth(core, 'secret_phrase');
  const auth2 = createAuth(core, 'secret_phrase');

  const accessToken = await auth1.authenticate({
    peerId,
    username,
    avatar
  });

  const decoded = await Promise.all([auth1, auth2].map((auth) => auth.decode(accessToken)))

  t.is(decoded[0].peerId, peerId);
  t.is(decoded[0].avatar, avatar);
  t.is(decoded[1].peerId, peerId);
  t.is(decoded[1].username, username);
  t.is(decoded[1].avatar, avatar);
  t.is(typeof decoded[0].iat, 'number');
  t.is(typeof decoded[1].iat, 'number');
  t.is(decoded[0].iat, decoded[1].iat);
});

test('should multiple auth instances allowed to decode the accessToken with different secrets and same node', async (t) => {
  const { core } = t.context;
  const peerId = 'custom_peer_id';
  const username = 'bob';
  const avatar = 'http://example.com/bob_avatar.png';
  const auth1 = createAuth(core, 'secret_phrase_1');
  const auth2 = createAuth(core, 'secret_phrase_2');

  const accessToken = await auth1.authenticate({
    peerId,
    username,
    avatar
  });

  const decoded = await Promise.all([auth1, auth2].map((auth) => auth.decode(accessToken)))

  t.is(decoded[0].peerId, peerId);
  t.is(decoded[0].username, username);
  t.is(decoded[0].avatar, avatar);
  t.is(decoded[1].peerId, peerId);
  t.is(decoded[1].username, username);
  t.is(decoded[1].avatar, avatar);
  t.is(typeof decoded[0].iat, 'number');
  t.is(typeof decoded[1].iat, 'number');
  t.is(decoded[0].iat, decoded[1].iat);
});

test('should multiple auth instances not allowed to decode the accessToken from different nodes', async (t) => {
  const node1 = createNode('testing_auth_node1', 4002);
  const node2 = createNode('testing_auth_node2', 4003);

  const peerId = 'custom_peer_id';
  const username = 'bob';
  const avatar = 'http://example.com/bob_avatar.png';
  const auth1 = createAuth(createCore(node1), 'secret_phrase_1');
  const auth2 = createAuth(createCore(node2), 'secret_phrase_1');

  const accessToken = await auth1.authenticate({
    peerId,
    username,
    avatar
  });

  const decoded = await auth1.decode(accessToken);

  t.is(decoded.peerId, peerId);
  t.is(decoded.username, username);
  t.is(decoded.avatar, avatar);
  t.is(typeof decoded.iat, 'number');

  await t.throwsAsync(() => auth2.decode(accessToken), {
    message: /invalid signature/
  });
});
