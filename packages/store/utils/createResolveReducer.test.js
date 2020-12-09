const test = require('ava');
const createResolveReducer = require('./createResolveReducer');

test('should resolve the reducers by alias', (t) => {
  const expected = { root: 'bar' };

  const rootReducer = () => ({
    root: '@foo'
  });

  const resolveReducer = createResolveReducer(rootReducer, {
    aliases: {
      "@foo": () => 'bar'
    }
  });

  const actual = resolveReducer()
  t.deepEqual(actual, expected);
});

test('should raise an error when recursion', (t) => {
  const rootReducer = () => ({
    root: '@foo'
  });

  const resolveReducer = createResolveReducer(rootReducer, {
    aliases: {
      "@foo": () => ({
        foo: '@foo'
      })
    }
  });

  t.throws(() => resolveReducer(), {
    message: /CuserStore: resolve-reducer max recursion "10" reached/
  });
});

test('should raise an error when deeper recursion', (t) => {
  const rootReducer = () => ({
    root: '@foo'
  });

  const resolveReducer = createResolveReducer(rootReducer, {
    aliases: {
      "@foo": () => ({
        foo: '@bar'
      }),
      '@bar': () => ({
        bar: '@foo'
      })
    }
  });

  t.throws(() => resolveReducer(), {
    message: /CuserStore: resolve-reducer max recursion "10" reached/
  });
});

test('should not raise an error if no recursion', (t) => {
  const rootReducer = () => ({
    root: '@foo'
  });

  const resolveReducer = createResolveReducer(rootReducer, {
    maxRecursion: 1,
    aliases: {
      "@foo": () => ({
        foo: '@bar',
        bob: '@bob',
      }),
      '@bar': () => ({
        bar: '@bob',
        alice: '@alice',
      }),
      '@bob': () => ({
        bob: '@alice',
      }),
      '@alice': () => ({
        alice: 'test'
      })
    }
  });

  t.notThrows(() => resolveReducer());
});

test('should nested parent into a prop', (t) => {
  const rootReducer = () => ({
    root: '@foo'
  });

  const expected = {
    "root": {
      "foo": {
        "bar": {
          "bob": {
            "alice": "test",
            "parent": {
              "alice": "test",
              "parent": null
            }
          }
        },
        "alice": {
          "alice": "test",
          "parent": {
            "alice": "test",
            "parent": null
          }
        }
      },
      "bob": {
        "bob": {
          "alice": "test",
          "parent": {
            "alice": "test",
            "parent": null
          }
        }
      }
    }
  }

  const resolveReducer = createResolveReducer(rootReducer, {
    aliases: {
      "@foo": () => ({
        foo: '@bar',
        bob: '@bob',
      }),
      '@bar': () => ({
        bar: '@bob',
        alice: '@alice',
      }),
      '@bob': () => ({
        bob: '@alice',
      }),
      '@alice': (state) => ({
        alice: 'test',
        parent: state ? state : null
      })
    }
  });

  const actual = new Array(2).fill().reduce(resolveReducer, undefined);

  t.deepEqual(actual, expected);
});

test('should works with action', (t) => {
  const rootReducer = () => ({
    root: '@foo'
  });
  const expected = {
    "root": {
      "foo": {
        "bar": {
          "bob": {
            "alice": "test",
            "parent": {
              "alice": "test",
              "parent": null,
              "payload": 0
            },
            "payload": 1
          }
        },
        "alice": {
          "alice": "test",
          "parent": {
            "alice": "test",
            "parent": null,
            "payload": 0
          },
          "payload": 1
        }
      },
      "bob": {
        "bob": {
          "alice": "test",
          "parent": {
            "alice": "test",
            "parent": null,
            "payload": 0
          },
          "payload": 1
        }
      }
    }
  };

  const resolveReducer = createResolveReducer(rootReducer, {
    aliases: {
      "@foo": () => ({
        foo: '@bar',
        bob: '@bob',
      }),
      '@bar': () => ({
        bar: '@bob',
        alice: '@alice',
      }),
      '@bob': () => ({
        bob: '@alice',
      }),
      '@alice': (state, { payload } = {}) => ({
        alice: 'test',
        parent: state ? state : null,
        payload,
      })
    }
  });

  const actual = new Array(2).fill().reduce((prev, _, idx) => resolveReducer(prev, { type: 'TEST', payload: idx }), undefined);

  t.deepEqual(actual, expected);
});


// prevent recursion
// prevent strings to be an aliases when postprocess, to prevent this sanitize will be an option
// should works with root alias

// drawbacks
// string sanitize
