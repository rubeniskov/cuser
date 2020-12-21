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
  const core = t.context.core = createCore(node);
  const auth = t.context.auth = createAuth(core, secret);
  const peerId = t.context.peerId = await core.peerId();
  t.context.reader = createReader(core, auth, peerId);
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
  const publisher = createPublisher(core, auth, {
    restore: false
  });

  await publisher.publishMessage(topicId, accessToken, data)

  const messages = await reader.getMessages(topicId);
  t.is(messages.length, 1);
  t.is(messages[0].node.content.data, data)
});

test('should update a message', async (t) => {
  const { core, auth, reader, accessToken } = t.context;
  const topicId = 'custom_topic_id_update';
  const data = `unique message for update ${new Date().getTime()}`;
  const modified = `modified ${data}`;
  const publisher = createPublisher(core, auth, {
    restore: false
  });

  await publisher.publishMessage(topicId, accessToken, data);

  let messages = await reader.getMessages(topicId);
  t.is(messages.length, 1);
  t.is(messages[0].node.content.data, data);

  await publisher.updateMessage(topicId, accessToken, messages[0].node.id, modified);

  messages = await reader.getMessages(topicId);
  t.is(messages.length, 1);
  t.is(messages[0].node.content.data, modified);
});

test('should update a deeper message', async (t) => {
  const { core, auth, reader, accessToken } = t.context;
  const topicId = 'custom_topic_id_update_deeper';
  const data = `unique message for update deeper ${new Date().getTime()}`;
  const modified = `modified ${data}`;
  const publisher = createPublisher(core, auth, {
    restore: false
  });

  await publisher.publishMessage(topicId, accessToken, `${data} nº 1`);
  await publisher.publishMessage(topicId, accessToken, `${data} nº 2`);
  await publisher.publishMessage(topicId, accessToken, `${data} nº 3`);

  let messages = await reader.getMessages(topicId);
  t.is(messages.length, 3);
  t.is(messages[0].node.content.data, `${data} nº 3`);
  t.is(messages[1].node.content.data, `${data} nº 2`);
  t.is(messages[2].node.content.data, `${data} nº 1`);

  await publisher.updateMessage(topicId, accessToken, messages[2].node.id, `${modified} nº 1`);
  messages = await reader.getMessages(topicId);
  t.is(messages.length, 3);
  t.is(messages[0].node.content.data, `${data} nº 3`);
  t.is(messages[1].node.content.data, `${data} nº 2`);
  t.is(messages[2].node.content.data, `${modified} nº 1`);
});

test('should update a delete', async (t) => {
  const { core, auth, reader, accessToken } = t.context;
  const topicId = 'custom_topic_id_delete';
  const data = `unique message for delete ${new Date().getTime()}`;
  const publisher = createPublisher(core, auth, {
    restore: false
  });

  await publisher.publishMessage(topicId, accessToken, data);

  let messages = await reader.getMessages(topicId);

  t.is(messages.length, 1);
  t.is(messages[0].node.content.data, data);

  await publisher.deleteMessage(topicId, accessToken, messages[0].node.id);
  messages = await reader.getMessages(topicId);
  t.is(messages.length, 0);
});

test('should delete a deeper message', async (t) => {
  const { core, auth, reader, accessToken } = t.context;
  const topicId = 'custom_topic_id_delete_deeper';
  const data = `unique message for delete deeper ${new Date().getTime()}`;
  const publisher = createPublisher(core, auth, {
    restore: false
  });

  await publisher.publishMessage(topicId, accessToken, `${data} nº 1`);
  await publisher.publishMessage(topicId, accessToken, `${data} nº 2`);
  await publisher.publishMessage(topicId, accessToken, `${data} nº 3`);

  let messages = await reader.getMessages(topicId);
  t.is(messages.length, 3);
  t.is(messages[0].node.content.data, `${data} nº 3`);
  t.is(messages[1].node.content.data, `${data} nº 2`);
  t.is(messages[2].node.content.data, `${data} nº 1`);

  await publisher.deleteMessage(topicId, accessToken, messages[2].node.id);
  messages = await reader.getMessages(topicId);
  t.is(messages.length, 2);
  t.is(messages[0].node.content.data, `${data} nº 3`);
  t.is(messages[1].node.content.data, `${data} nº 2`);
});

test('should restore the previous state', async (t) => {
  const { core, auth, reader, accessToken } = t.context;
  const topicId = 'custom_topic_id_delete_deeper';
  const data = `unique message for delete deeper ${new Date().getTime()}`;
  let publisher = createPublisher(core, auth, {
    restore: false
  });

  await publisher.publishMessage(topicId, accessToken, `${data} nº 1`);
  await publisher.publishMessage(topicId, accessToken, `${data} nº 2`);
  await publisher.publishMessage(topicId, accessToken, `${data} nº 3`);

  let messages = await reader.getMessages(topicId);
  t.is(messages.length, 3);
  t.is(messages[0].node.content.data, `${data} nº 3`);
  t.is(messages[1].node.content.data, `${data} nº 2`);
  t.is(messages[2].node.content.data, `${data} nº 1`);

  publisher = createPublisher(core, auth);

  await publisher.publishMessage(topicId, accessToken, `${data} nº 4`);
  await publisher.publishMessage(topicId, accessToken, `${data} nº 5`);
  await publisher.publishMessage(topicId, accessToken, `${data} nº 6`);

  messages = await reader.getMessages(topicId);
  t.is(messages.length, 6);

  t.is(messages[0].node.content.data, `${data} nº 6`);
  t.is(messages[1].node.content.data, `${data} nº 5`);
  t.is(messages[2].node.content.data, `${data} nº 4`);
  t.is(messages[3].node.content.data, `${data} nº 3`);
  t.is(messages[4].node.content.data, `${data} nº 2`);
  t.is(messages[5].node.content.data, `${data} nº 1`);
});
