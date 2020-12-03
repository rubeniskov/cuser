const test = require('ava');
const sinon = require('sinon');
const crypto = require('crypto');
const createCore = require('./core');

const md5 = (data) => crypto.createHash('md5').update(typeof data === 'string' ? data : JSON.stringify(data)).digest("hex");

test.beforeEach((t) => {
  const id = md5('test');
  const cache = {};
  let cursor = id;
  t.context.node = {
    id: sinon.spy(() => Promise.resolve({ id })),
    name: {
      publish: (hash) => {
        cursor = hash;
        return Promise.resolve({
          name: id,
          value: hash,
        })
      },
      resolve: sinon.spy(() => ({
        [Symbol.asyncIterator]() {
          let entry = false;
          return {
            async next() {
              if (!entry) {
                entry = true;
                return { done: false, value: cursor };
              } else {
                return { done: true };
              }
            }
          }
        }
      })),
      pubsub: {
        state: sinon.spy(() => Promise.resolve({ enabled: true }))
      }
    },
    dag: {
      get: sinon.spy((hash) => Promise.resolve({ value: cache[hash], remainderPath: '/' })),
      put: sinon.spy((data) => {
        const hash = md5(data);
        cache[hash] = data;
        return hash
      }),
    }
  };
});

test('should raise an error when node is not defined', (t) => {
  t.throws(() => {
    createCore();
  }, {
    message: /CuserCore: node must be defined and be an instance of IPFS/
  });
});

test('should create an instance of CuserCore', (t) => {
  t.true(createCore({}) instanceof createCore.CuserCore);
});

test('should puts object into dag', async (t) => {
  const { node } = t.context;
  const core = createCore(node);
  const hash = await core.put({
    'foo': 'bar'
  });

  t.is(typeof hash, 'string');
  t.is(hash.length, 32);
});

test('should gets the content of hash', async (t) => {
  const { node } = t.context;
  const core = createCore(node);
  const mixed = {
    'foo': 'bar'
  }

  const hash = await core.put(mixed);

  const result = await core.get(hash);

  t.is(result, mixed);
});

test('should throws a error when name.pubsub not enabled', async (t) => {
  const { node } = t.context;
  const core = createCore(node);
  node.name.pubsub.state = () => Promise.resolve({ enabled: false });
  const hash = await core.put({
    'foo': 'bar'
  });

  await t.throwsAsync(() => core.publish(hash), {
    message: /CuserCore: ipns pubsub is not enabled, options.EXPERIMENTAL.ipnsPubsub = true/
  })
});

test('should publish a hash', async (t) => {
  const { node } = t.context;
  const { id } = await node.id();
  const core = createCore(node);
  const hash = await core.put({
    'foo': 'bar'
  });
  const { name, value } = await core.publish(hash);

  t.true(node.name.pubsub.state.calledOnce);
  t.is(hash, value);
  t.is(name, id);
});

test('should resolve a hash', async (t) => {
  const { node } = t.context;
  const { id } = await node.id();
  const core = createCore(node);
  const hash = await core.put({
    'foo': 'bar'
  });
  const { name, value } = await core.publish(hash);

  t.true(node.name.pubsub.state.calledOnce);
  t.is(hash, value);
  t.is(name, id);

  const resolved = await core.resolve(id);

  t.is(hash, resolved);
});

// test('should resolve using ipns', async (t) => {
//   const { node } = t.context;
//   const { id } = await node.id();
//   const core = createCore(node);
//   const hash = await core.resolve('test');

//   t.is(id, hash);
// });
