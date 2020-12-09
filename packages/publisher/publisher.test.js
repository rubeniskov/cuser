const test = require('ava');
const os = require('os');
const path = require('path');
const ipfs = require('ipfs');
const createAuth = require('@cuser/auth');
const createCore = require('@cuser/core');
const createReader = require('@cuser/reader');
const createPublisher = require('./publisher');

test.before(async (t) => {
  const repo = path.resolve(os.tmpdir(), 'cuser_publishet_testing');
  const secret = t.context.secret = 'custom_secret_phrase';
  const node = t.context.node = await ipfs.create({
    repo,
    EXPERIMENTAL: {
      ipnsPubsub: true
    }
  });
  const auth = t.context.auth = createAuth(node, secret);
  const core = t.context.core = createCore(node);
  const peerId = t.context.peerId = await core.peerId();
  t.context.reader = createReader(core, peerId);
  t.context.accessToken = await auth.authenticate({
    peerId: 'custom_peer_id',
    username: 'bob',
    avatar: 'http://www.exmaple.com/bob_avatar.png',
  });
  t.log(`starting ipfs node using repo ${repo}`);
});

test.after(async (t) => {
  t.log(`stoping ipfs`);
  await t.context.node.stop();
});

test('should throws an error when core not defined', (t) => {
  const { core, auth } = t.context;
  t.throws(() => createPublisher(), {
    message: 'CuserPublisher: core must be defined and be an instance of CuserCore'
  });

  t.throws(() => createPublisher({}), {
    message: 'CuserPublisher: core must be defined and be an instance of CuserCore'
  });
});

test('should throws an error when auth not defined', (t) => {
  const { core } = t.context;
  t.throws(() => createPublisher(core), {
    message: 'CuserPublisher: auth must be defined and be an instance of CuserAuth'
  });

  t.throws(() => createPublisher(core, {}), {
    message: 'CuserPublisher: auth must be defined and be an instance of CuserAuth'
  });
});

test('should create an instance of CuserPublisher', (t) => {
  const { core, auth } = t.context;
  const publisher = createPublisher(core, auth);
  t.true(publisher instanceof createPublisher.CuserPublisher);
});

test('should publish a message', async (t) => {
  const { core, auth, reader, accessToken } = t.context;
  const topicId = 'custom_topic_id_publish';
  const data = `unique message for publish ${new Date().getTime()}`;
  const publisher = createPublisher(core, auth);

  await publisher.publishMessage(topicId, accessToken, data)

  // .then(({ value }) => {
  //   console.log(value);
  //   // node.dag.get(value).console.log(value);
  // });

  const messages = await reader.getMessages(topicId);
  t.is(messages.length, 1);
  t.is(messages[0].node.content.data, data)
});

test('should update a message', async (t) => {
  const { core, auth, reader, accessToken } = t.context;
  const topicId = 'custom_topic_id_update';
  const data = `unique message for update ${new Date().getTime()}`;
  const modified = `modified ${data}`;
  const publisher = createPublisher(core, auth);

  await publisher.publishMessage(topicId, accessToken, data);

  let messages = await reader.getMessages(topicId);
  t.is(messages.length, 1);
  t.is(messages[0].node.content.data, data);

  await publisher.updateMessage(topicId, accessToken, messages[0].node.id, modified);

  messages = await reader.getMessages(topicId);
  t.is(messages.length, 1);
  t.is(messages[0].node.content.data, modified);
});

test('should update a delete', async (t) => {
  const { core, auth, reader, accessToken } = t.context;
  const topicId = 'custom_topic_id_delete';
  const data = `unique message for delete ${new Date().getTime()}`;
  const publisher = createPublisher(core, auth);

  await publisher.publishMessage(topicId, accessToken, data);

  let messages = await reader.getMessages(topicId);
  t.is(messages.length, 1);
  t.is(messages[0].node.content.data, data);

  await publisher.deleteMessage(topicId, accessToken, messages[0].node.id);

  messages = await reader.getMessages(topicId);
  t.is(messages.length, 0);
});
