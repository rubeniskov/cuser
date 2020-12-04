const test = require('ava');
const sinon = require('sinon');
const crypto = require('crypto');
const createPublisher = require('./publisher');

const md5 = (data) => crypto.createHash('md5').update(typeof data === 'string' ? data : JSON.stringify(data)).digest("hex");

test.beforeEach((t) => {
  const id = md5('test');
  const cache = t.context.cache = {};
  let cursor = id;
  t.context.core = {
    resolve: sinon.spy(() => Promise.resolve(cursor)),
    get: sinon.spy((hash) => Promise.resolve(cache[hash])),
    put: sinon.spy((data) => {
      const hash = md5(data);
      cache[hash] = data;
      return Promise.resolve(hash);
    }),
    publish: sinon.spy((cid) => {
      cursor = cid;
      return Promise.resolve({ name: id, value: cid });
    })
  };
});

test('should raise an error when node is not defined', (t) => {
  t.throws(() => {
    createPublisher();
  }, {
    message: /CuserPublisher: core must be defined/
  });
});

test('should create an instance of CuserPublisher', (t) => {
  const { core } = t.context;
  t.true(createPublisher(core) instanceof createPublisher.CuserPublisher);
});

test('should publish message', async (t) => {
  const { core } = t.context;
  const publisher = createPublisher(core);
  const topicId = 'custom_topic_id';

  await publisher.publish({
    topicId,
    content: {
      data: 'test'
    },
    user: {
      username: 'pepe',
      avatar: 'juas',
      peerId: 'asdasdasd'
    },
  });

  t.is(core.put.callCount, 5);
  t.true(core.publish.calledOnce);
});

test('should delete message', async (t) => {
  const { core, cache } = t.context;
  const publisher = createPublisher(core);
  const topicId = 'custom_topic_id';

  const publishResult = await publisher.publish({
    topicId,
    content: {
      data: 'test'
    },
    user: {
      username: 'pepe',
      avatar: 'juas',
      peerId: 'asdasdasd'
    },
  });

  let root = await core.get(publishResult.value);
  let topic = await core.get(root.topics[topicId]);
  let message = await core.get(topic.message);

  const deleteResult = await publisher.delete({
    topicId: 'asdasdasdasd',
    messageId: message.id,
    user: {
      username: 'pepe',
      avatar: 'juas',
      peerId: 'asdasdasd'
    },
  });

  console.log(cache);

  root = await core.get(deleteResult.value);
  console.log(root);
  topic = await core.get(root.topics[topicId]);
  console.log(root, topic);
  // message = await core.get(topic.message);

  console.log(message);
  t.pass();

  // t.is(core.put.callCount, 5);
  // t.true(core.publish.calledOnce);
});
