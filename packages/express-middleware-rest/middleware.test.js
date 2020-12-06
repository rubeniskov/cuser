const test = require('ava');
const path = require('path');
const os = require('os');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
const request = require('supertest');
const ipfs = require('ipfs');
const createCore = require('@cuser/core');
const createAuth = require('@cuser/auth');
const createReader = require('@cuser/reader');
const createMiddleware = require('./middleware');
const express = require("express");

test.before(async (t) => {
  const repo = path.resolve(os.tmpdir(), 'cuser_testing_rest_middleware');
  await rimraf(repo);
  const node = t.context.node = await ipfs.create({
    repo,
    EXPERIMENTAL: {
      ipnsPubsub: true
    }
  });
  t.context.core = createCore(node);
  t.context.reader = createReader(t.context.core, t.context.core.peerId());
  t.context.auth = createAuth(node, 'secret_testing');
  t.context.topicId = 'custom_topic_id';
  t.context.accessToken = await t.context.auth.authenticate({
    peerId: 'custom_user_peerId',
    username: 'foo',
    avatar: 'http://www.example.com/bob_avatar.png'
  });
  t.log(`starting ipfs node using repo ${repo}`);
});

test.after(async (t) => {
  t.log(`stoping ipfs`);
  await t.context.node.stop();
});

test.serial('should responses with version, name, description', async (t) => {
  const { core, auth } = t.context;
  const { name, version, description } = require('./package.json');
  const server = express().use(createMiddleware(core, auth));
  const res = await request(server)
        .get("/")
        .send();

  t.is(res.status, 200);
  t.deepEqual(res.body, {
    name, version, description
  });
});

test.serial('should responses an error when publish a message without authentication', async (t) => {
  const { core, auth, topicId } = t.context;
  const data = 'message content';

  const server = express().use(createMiddleware(core, auth));

  const res = await request(server)
    .post("/rest/message")
    .send({
      topicId,
      content: {
        data,
      }
    });

  t.is(res.status, 401);
  t.deepEqual(res.body, { message: 'unauthenticated' });
});

test.serial('should publish a message', async (t) => {
  const { core, auth, topicId, accessToken, reader } = t.context;
  const data = 'message content';

  const server = express().use(createMiddleware(core, auth));
  const res = await request(server)
    .post("/rest/message")
    .set('Authorization', accessToken)
    .send({
      topicId,
      content: {
        data,
      }
    });

  t.is(res.status, 200);
  t.deepEqual(Object.keys(res.body), ['name', 'value']);

  const messages = await reader.getMessages(topicId);
  t.is(messages.length, 1);
});

test.serial('should update a message', async (t) => {
  const { core, auth, reader, topicId, accessToken } = t.context;
  const data = 'message content';
  const [{ node: { id: messageId }}] = await reader.getMessages(topicId);

  const server = express().use(createMiddleware(core, auth));

  const res = await request(server)
    .patch("/rest/message")
    .set('Authorization', accessToken)
    .send({
      topicId,
      messageId,
      content: {
        data,
      }
    });

  t.is(res.status, 200);
  t.deepEqual(Object.keys(res.body), ['name', 'value']);
});

test.serial('should delete a message', async (t) => {
  const { core, auth, reader, topicId, accessToken } = t.context;
  const data = 'message content';


  const server = express().use(createMiddleware(core, auth));
  const [{ node: { id: messageId }}] = await reader.getMessages(topicId);

  const res = await request(server)
    .delete("/rest/message")
    .set('Authorization', accessToken)
    .send({
      topicId,
      messageId,
    });

  t.is(res.status, 200);
  t.deepEqual(Object.keys(res.body), ['name', 'value']);
});
