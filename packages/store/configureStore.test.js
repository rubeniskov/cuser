const test = require('ava');
const { format } = require('util');
const { createIterator } = require('traverse-json');

const {
  TYPE_ACTION_PUBLISH_MESSAGE,
  TYPE_ACTION_UPDATE_MESSAGE,
  TYPE_ACTION_DELETE_MESSAGE,
} = require('./types/actions');
const {
  TYPE_ERROR_INVALID_ACTION,
  TYPE_ERROR_USER_MUST_BE_THE_OWNER,
  TYPE_ERROR_MISSING_RESOURCE_ID,
} = require('./types/errors');

const createAction = require('./utils/createAction');
const createUsers = require('./testing/createUsers');
const configureStore = require('./configureStore');
const rootReducer = require('./reducers');
const aliases = require('./reducers/aliases');

const createStore = () => configureStore(rootReducer, { aliases });

const getMessages = (store, topicId) => {
  const message = store.getState().topics[topicId].message
  return [message].concat(Array.from(createIterator(message, '@parent')).map(([,v]) => v).filter(Boolean));
};
const getMessageIds = (store) => Array.from(createIterator(store.getState(), '**/message/**/id')).map(([,v]) => v);
const randomHash = (l = 32) => new Array(l).fill().map(() => String.fromCharCode(65 + ~~(Math.random() * 10))).join('');

const dispatchActions = (store, actions) => (Array.isArray(actions) ? actions : [actions]).forEach((action) => {
  store.dispatch(action);
})

let users;

test.before((t) => {
  users = createUsers(5);
  t.log('user created', users);
});

test.beforeEach((t) => {
  t.context.store = createStore();
  t.context.topicId = randomHash();
});

test.afterEach((t) => {
  t.log(JSON.stringify(t.context.store.getState(), null, 2));
});

test('should publish messages', (t) => {
  const { store, topicId } = t.context;
  const publishActions = [
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[0],
    }),
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[1],
    }),
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[1],
    }),
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[1],
    })
  ].map(({ type, payload }, idx) => ({
    type,
    payload: {
      ...payload,
      topicId,
      content: { data: `message nº: ${idx}` },
    }
  }));

  t.plan(publishActions.length * 5);
  let idx = 0;
  store.subscribe(() => {
    const state = store.getState();
    t.truthy(state.topics[topicId]);
    t.truthy(state.topics[topicId].message);
    const messages = getMessages(store, topicId);
    t.is(messages.length, idx + 1);
    t.is(publishActions[0].payload.content.data, messages[idx].content.data);
    t.is(publishActions[idx].payload.content.data, messages[messages.length - idx - 1].content.data);
    idx++
  });

  dispatchActions(store, publishActions);
});

test('should throws error when publish messages', (t) => {
  const { store, topicId } = t.context;

  t.throws(() => {
    dispatchActions(store, [createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
        topicId,
        content: 'Wrong payload format',
        user: users[0],
      })
    ]);
  }, {
    message: format(TYPE_ERROR_INVALID_ACTION, TYPE_ACTION_PUBLISH_MESSAGE),
  });
});

test('should update messages', (t) => {
  const { store, topicId } = t.context;
  const publishActions = [
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[0],
    }),
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[1],
    }),
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[0],
    }),
  ].map(({ type, payload }, idx) => ({
    type,
    payload: {
      ...payload,
      topicId,
      content: { data: `message nº: ${idx}` },
    }
  }));

  dispatchActions(store, publishActions);

  const messageIds = getMessageIds(store);

  const updateActions = [
    createAction(TYPE_ACTION_UPDATE_MESSAGE, {
      topicId,
      content: { data: 'modified message 1 rev 2' },
      messageId: messageIds[0],
      user: users[0],
    }),
    createAction(TYPE_ACTION_UPDATE_MESSAGE, {
      topicId,
      content: { data: 'modified message 1 rev 2' },
      messageId: messageIds[1],
      user: users[1],
    })
  ];

  t.plan(updateActions.length * 4);
  let idx = 0;
  store.subscribe(() => {
    const state = store.getState();
    t.truthy(state.topics[topicId]);
    t.truthy(state.topics[topicId].message);
    const messages = getMessages(store, topicId);
    const message = messages.find(({ id }) => updateActions[idx].payload.messageId === id);
    t.is(messages.length, 3);
    t.is(updateActions[0].payload.content.data, message.content.data);
    idx++
  });

  dispatchActions(store, updateActions);
});

test('should throws error when update messages', (t) => {
  const { store, topicId } = t.context;
  const publishActions = [
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[0],
    }),
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[1],
    }),
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[0],
    }),
  ].map(({ type, payload }, idx) => ({
    type,
    payload: {
      ...payload,
      topicId,
      content: { data: `message nº: ${idx}` },
    }
  }));

  dispatchActions(store, publishActions);

  const messageIds = getMessageIds(store);

  t.throws(() => {
    dispatchActions(store, [createAction(TYPE_ACTION_UPDATE_MESSAGE, {
        topicId: 'non_existing_topic',
        content: { data: 'modified message 1 rev 2' },
        messageId: messageIds[0],
        user: users[1],
      })
    ]);
  }, {
    message: format(TYPE_ERROR_MISSING_RESOURCE_ID, 'Topic', 'non_existing_topic'),
  });

  t.throws(() => {
    dispatchActions(store, [createAction(TYPE_ACTION_UPDATE_MESSAGE, {
        topicId,
        content: { data: 'modified message 1 rev 2' },
        messageId: messageIds[0],
        user: users[1],
      })
    ]);
  }, {
    message: format(TYPE_ERROR_USER_MUST_BE_THE_OWNER, 'message')
  });

  t.throws(() => {
    dispatchActions(store, [createAction(TYPE_ACTION_UPDATE_MESSAGE, {
        topicId,
        content: { data: 'modified message 1 rev 2' },
        messageId: 'non_existing_message_id',
        user: users[0],
      })
    ]);
  }, {
    message: format(TYPE_ERROR_MISSING_RESOURCE_ID, 'Message', 'non_existing_message_id'),
  });

  t.throws(() => {
    dispatchActions(store, [createAction(TYPE_ACTION_UPDATE_MESSAGE, {
        topicId,
        content: 'Wrong payload format',
        messageId: messageIds[0],
        user: users[0],
      })
    ]);
  }, {
    message: format(TYPE_ERROR_INVALID_ACTION, TYPE_ACTION_UPDATE_MESSAGE),
  });
});

test('should delete messages', (t) => {
  const { store, topicId } = t.context;
  const publishActions = [
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[0],
    }),
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[1],
    }),
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[0],
    }),
  ].map(({ type, payload }, idx) => ({
    type,
    payload: {
      ...payload,
      topicId,
      content: { data: `message nº: ${idx}` },
    }
  }));

  dispatchActions(store, publishActions);

  const messageIds = getMessageIds(store);

  dispatchActions(store, [createAction(TYPE_ACTION_DELETE_MESSAGE, {
      topicId,
      messageId: messageIds[1],
      user: users[1],
    })
  ]);

  let messages = getMessages(store, topicId);
  t.is(messages.length, 2);

  t.true(!messages.map(({id}) => id).some((id) => id === messageIds[1]));
  t.true(!messages.map(({content}) => content.data).includes('message nº: 1'))
  t.pass();


  dispatchActions(store, [createAction(TYPE_ACTION_DELETE_MESSAGE, {
      topicId,
      messageId: messageIds[2],
      user: users[0],
    })
  ]);

  messages = getMessages(store, topicId);

  t.is(messages.length, 1);
  t.is(messages[0].content.data, 'message nº: 0');
});


test('should throws error when delete messages', (t) => {
  const { store, topicId } = t.context;
  const publishActions = [
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[0],
    }),
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[1],
    }),
    createAction(TYPE_ACTION_PUBLISH_MESSAGE, {
      user: users[0],
    }),
  ].map(({ type, payload }, idx) => ({
    type,
    payload: {
      ...payload,
      topicId,
      content: { data: `message nº: ${idx}` },
    }
  }));

  dispatchActions(store, publishActions);

  const messageIds = getMessageIds(store);

  t.throws(() => {
    dispatchActions(store, [createAction(TYPE_ACTION_DELETE_MESSAGE, {
        topicId: 'non_existing_topic',
        messageId: messageIds[0],
        user: users[1],
      })
    ]);
  }, {
    message: format(TYPE_ERROR_MISSING_RESOURCE_ID, 'Topic', 'non_existing_topic'),
  });

  t.throws(() => {
    dispatchActions(store, [createAction(TYPE_ACTION_DELETE_MESSAGE, {
        topicId,
        messageId: messageIds[0],
        user: users[1],
      })
    ]);
  }, {
    message: format(TYPE_ERROR_USER_MUST_BE_THE_OWNER, 'message'),
  });

  t.throws(() => {
    dispatchActions(store, [createAction(TYPE_ACTION_DELETE_MESSAGE, {
        topicId,
        messageId: 'non_existing_message_id',
        user: users[0],
      })
    ]);
  }, {
    message: format(TYPE_ERROR_MISSING_RESOURCE_ID, 'Message', 'non_existing_message_id'),
  });

  t.throws(() => {
    dispatchActions(store, [createAction(TYPE_ACTION_DELETE_MESSAGE, {
        topicId,
        user: users[0],
      })
    ]);
  }, {
    message: format(TYPE_ERROR_INVALID_ACTION, TYPE_ACTION_DELETE_MESSAGE),
  });
});
