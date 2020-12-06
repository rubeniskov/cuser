const test = require('ava');
const createAuth = require('./auth');
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
  t.context.node = await createNode('testing_auth', 4001);
});

test('should create an instance of CuserAuth', (t) => {
  const { node } = t.context;
  const auth = createAuth(node, 'secret_phrase');
  t.true(auth instanceof CuserAuth);
});

test('should throws and error when payload has not the right format', async (t) => {
  const { node } = t.context;
  const username = 'bob';
  const avatar = 'http://example.com/bob_avatar.png';
  const auth = createAuth(node, 'secret_phrase');

  await t.throwsAsync(() => auth.authenticate({
    username,
    avatar
  }), {
    message: /Invalid format/
  });
});

test('should return a valid accessToken', async (t) => {
  const { node } = t.context;
  const peerId = 'custom_peer_id';
  const username = 'bob';
  const avatar = 'http://example.com/bob_avatar.png';
  const auth = createAuth(node, 'secret_phrase');

  const accessToken = await auth.authenticate({
    peerId,
    username,
    avatar
  });

  t.is(typeof accessToken, 'string');
});

test('should return a decode the accessToken', async (t) => {
  const { node } = t.context;
  const peerId = 'custom_peer_id';
  const username = 'bob';
  const avatar = 'http://example.com/bob_avatar.png';
  const auth = createAuth(node, 'secret_phrase');

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
});

test('should multiple auth instances allowed to decode the accessToken with the same secret and same node', async (t) => {
  const { node } = t.context;
  const peerId = 'custom_peer_id';
  const username = 'bob';
  const avatar = 'http://example.com/bob_avatar.png';
  const auth1 = createAuth(node, 'secret_phrase');
  const auth2 = createAuth(node, 'secret_phrase');

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
});

test('should multiple auth instances allowed to decode the accessToken with different secrets and same node', async (t) => {
  const { node } = t.context;
  const peerId = 'custom_peer_id';
  const username = 'bob';
  const avatar = 'http://example.com/bob_avatar.png';
  const auth1 = createAuth(node, 'secret_phrase_1');
  const auth2 = createAuth(node, 'secret_phrase_2');

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
});

test('should multiple auth instances not allowed to decode the accessToken from different nodes', async (t) => {
  const node1 = await createNode('testing_auth_node1', 4002);
  const node2 = await createNode('testing_auth_node2', 4003);

  const peerId = 'custom_peer_id';
  const username = 'bob';
  const avatar = 'http://example.com/bob_avatar.png';
  const auth1 = createAuth(node1, 'secret_phrase_1');
  const auth2 = createAuth(node2, 'secret_phrase_1');

  const accessToken = await auth1.authenticate({
    peerId,
    username,
    avatar
  });

  const decoded = await auth1.decode(accessToken);

  t.is(decoded.peerId, peerId);
  t.is(decoded.username, username);
  t.is(decoded.avatar, avatar);

  await t.throwsAsync(() => auth2.decode(accessToken), {
    message: /invalid signature/
  });
});
