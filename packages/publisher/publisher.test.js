const test = require('ava');
const sinon = require('sinon');
const crypto = require('crypto');
const os = require('os');
const path = require('path');
const ipfs = require('ipfs');
const createAuth = require('@cuser/auth');
const createReader = require('@cuser/reader');
const createPublisher = require('./publisher');

test.before(async (t) => {
  const secret = t.context.secret = 'custom_secret_phrase';
  const node = t.context.node = await ipfs.create({
    repo: path.resolve(os.tmpdir(), 'cuser_publishet_testing'),
    EXPERIMENTAL: {
      ipnsPubsub: true
    }
  });
  const auth = createAuth(node, secret);
  const { id } = await node.id();
  const peerId = t.context.peerId = id;
  t.context.reader = createReader(node, peerId);
  t.context.accessToken = await auth.authenticate({
    peerId: 'custom_peer_id',
    username: 'bob',
    avatar: 'http://www.exmaple.com/bob_avatar.png',
  });
});

test('should create an instance of CuserPublisher', (t) => {
  const { node, secret } = t.context;
  const publisher = createPublisher(node, secret);
  t.true(publisher instanceof createPublisher.CuserPublisher);
});

test('should publish a message', async (t) => {
  const { node, reader, secret, accessToken } = t.context;
  const topicId = 'custom_topic_id_publish';
  const data = `unique message for publish ${new Date().getTime()}`;
  const publisher = createPublisher(node, secret, {
    preloadedState: null
  });

  await publisher.publishMessage(topicId, accessToken, data);

  const messages = await reader.getMessages(topicId);
  t.is(messages.length, 1);
  t.is(messages[0].node.content.data, data)
});

test('should update a message', async (t) => {
  const { node, reader, secret, accessToken } = t.context;
  const topicId = 'custom_topic_id_update';
  const data = `unique message for update ${new Date().getTime()}`;
  const modified = `modified ${data}`;
  const publisher = createPublisher(node, secret, {
    preloadedState: null
  });

  await publisher.publishMessage(topicId, accessToken, data);

  let messages = await reader.getMessages(topicId);
  t.is(messages.length, 1);
  t.is(messages[0].node.content.data, data);

  await publisher.updateMessage(topicId, accessToken, messages[0].node.id, modified);

  messages = await reader.getMessages(topicId);
  t.is(messages.length, 1);
  t.is(messages[0].node.content.data, modified);

  // console.log(JSON.stringify(messages, null, 2));
});

// test('should update a delete', async (t) => {
//   const { node, reader, secret, accessToken } = t.context;
//   const topicId = 'custom_topic_id_delete';
//   const data = `unique message for delete ${new Date().getTime()}`;
//   const publisher = createPublisher(node, secret, {
//     preloadedState: null
//   });

//   await publisher.publishMessage(topicId, accessToken, data);

//   let messages = await reader.getMessages(topicId);
//   t.is(messages.length, 1);
//   t.is(messages[0].node.content.data, data);

//   await publisher.deleteMessage(topicId, accessToken, messages[0].node.id);

//   messages = await reader.getMessages(topicId);
//   t.is(messages.length, 0);

//   console.log(JSON.stringify(messages, null, 2));
// });
