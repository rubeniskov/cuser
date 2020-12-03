<p align="center">
  <a href="./"><img width="250" src="https://raw.githubusercontent.com/rubeniskov/cuser/master/docs/logo.svg" alt="cuser logo" /></a>
</p>

# @cuser/store

## Status
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=store)](https://codecov.io/gh/rubeniskov/cuser)
[![npm](https://img.shields.io/npm/v/@cuser/store.svg)](https://www.npmjs.com/package/@cuser/store)

Store dedicated to manage the tree changes of cuser state 

## Stricted mutation system

In order to prevent bad insertions in `dag` tree, is necessary implement a stricted validations, delegates to do `jsonschema` the validations in combination with reducers
# @cuser/store

## Index

### Variables

* [GraphType](globals.md#graphtype)
* [TYPE\_ACTION\_DELETE\_MESSAGE](globals.md#type_action_delete_message)
* [TYPE\_ACTION\_PUBLISH\_MESSAGE](globals.md#type_action_publish_message)
* [TYPE\_ACTION\_UPDATE\_MESSAGE](globals.md#type_action_update_message)
* [TYPE\_ERROR\_MISSING\_PREVIOUS\_STATE](globals.md#type_error_missing_previous_state)
* [TYPE\_ERROR\_MISSING\_RESOURCE\_ID](globals.md#type_error_missing_resource_id)
* [TYPE\_ERROR\_USER\_MUST\_BE\_THE\_OWNER](globals.md#type_error_user_must_be_the_owner)
* [applyMiddleware](globals.md#applymiddleware)
* [assert](globals.md#assert)
* [compose](globals.md#compose)
* [contentReducer](globals.md#contentreducer)
* [createReducer](globals.md#createreducer)
* [createResolveReducer](globals.md#createresolvereducer)
* [createStore](globals.md#createstore)
* [dataReducer](globals.md#datareducer)
* [loggerMiddleware](globals.md#loggermiddleware)
* [messageReducer](globals.md#messagereducer)
* [monitorReducerEnhancer](globals.md#monitorreducerenhancer)
* [recursiveReducer](globals.md#recursivereducer)
* [topicReducer](globals.md#topicreducer)
* [topicsReducer](globals.md#topicsreducer)
* [userReducer](globals.md#userreducer)

### Functions

* [configureStore](globals.md#configurestore)

## Variables

### GraphType

•  **GraphType**: GraphType

*Defined in [store/reducers/topic.js:7](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topic.js#L7)*

*Defined in [store/reducers/message.js:8](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L8)*

*Defined in [store/reducers/user.js:5](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/user.js#L5)*

*Defined in [store/reducers/content.js:8](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/content.js#L8)*

___

### TYPE\_ACTION\_DELETE\_MESSAGE

•  **TYPE\_ACTION\_DELETE\_MESSAGE**: any

*Defined in [store/reducers/topics.js:12](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topics.js#L12)*

*Defined in [store/reducers/topic.js:11](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topic.js#L11)*

*Defined in [store/reducers/message.js:12](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L12)*

___

### TYPE\_ACTION\_PUBLISH\_MESSAGE

•  **TYPE\_ACTION\_PUBLISH\_MESSAGE**: any

*Defined in [store/reducers/topics.js:10](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topics.js#L10)*

*Defined in [store/reducers/topic.js:9](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topic.js#L9)*

*Defined in [store/reducers/message.js:10](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L10)*

*Defined in [store/reducers/user.js:7](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/user.js#L7)*

*Defined in [store/reducers/content.js:9](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/content.js#L9)*

*Defined in [store/reducers/data.js:4](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/data.js#L4)*

___

### TYPE\_ACTION\_UPDATE\_MESSAGE

•  **TYPE\_ACTION\_UPDATE\_MESSAGE**: any

*Defined in [store/reducers/topics.js:11](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topics.js#L11)*

*Defined in [store/reducers/topic.js:10](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topic.js#L10)*

*Defined in [store/reducers/message.js:11](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L11)*

*Defined in [store/reducers/content.js:9](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/content.js#L9)*

*Defined in [store/reducers/data.js:4](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/data.js#L4)*

___

### TYPE\_ERROR\_MISSING\_PREVIOUS\_STATE

•  **TYPE\_ERROR\_MISSING\_PREVIOUS\_STATE**: any

*Defined in [store/reducers/content.js:10](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/content.js#L10)*

___

### TYPE\_ERROR\_MISSING\_RESOURCE\_ID

•  **TYPE\_ERROR\_MISSING\_RESOURCE\_ID**: any

*Defined in [store/reducers/topics.js:15](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topics.js#L15)*

*Defined in [store/reducers/message.js:16](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L16)*

___

### TYPE\_ERROR\_USER\_MUST\_BE\_THE\_OWNER

•  **TYPE\_ERROR\_USER\_MUST\_BE\_THE\_OWNER**: any

*Defined in [store/reducers/message.js:15](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L15)*

___

### applyMiddleware

•  **applyMiddleware**: applyMiddleware

*Defined in [store/configureStore.js:4](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/configureStore.js#L4)*

___

### assert

• `Const` **assert**: any = require('@cuser/utils/assert')

*Defined in [store/reducers/topics.js:7](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topics.js#L7)*

*Defined in [store/reducers/message.js:6](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L6)*

*Defined in [store/reducers/content.js:6](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/content.js#L6)*

___

### compose

•  **compose**: compose

*Defined in [store/configureStore.js:4](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/configureStore.js#L4)*

___

### contentReducer

• `Const` **contentReducer**: (Anonymous function) = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]: () => ({ type: GraphType.GRAPH\_CONTENT, parent: null, revision: '@revision', cdate: '@timestamp', data: '@data', }), [TYPE\_ACTION\_UPDATE\_MESSAGE]: (state) => { assert(state, TYPE\_ERROR\_MISSING\_PREVIOUS\_STATE); return { ...state, parent: state, revision: '@revision', cdate: '@timestamp', data: '@data', } }})

*Defined in [store/reducers/content.js:22](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/content.js#L22)*

Content reducer for manage message data and its historical revisions,
when update action, the current state will be swaped to parent in order
to keep the tree changes

**`param`** 

**`param`** 

___

### createReducer

• `Const` **createReducer**: [createReducer](globals.md#createreducer) = require('../utils/createReducer')

*Defined in [store/reducers/topics.js:18](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topics.js#L18)*

*Defined in [store/reducers/topic.js:14](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topic.js#L14)*

*Defined in [store/reducers/message.js:19](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L19)*

*Defined in [store/reducers/user.js:10](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/user.js#L10)*

*Defined in [store/reducers/content.js:12](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/content.js#L12)*

*Defined in [store/reducers/data.js:6](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/data.js#L6)*

___

### createResolveReducer

• `Const` **createResolveReducer**: [createResolveReducer](globals.md#createresolvereducer) = require('./createResolveReducer')

*Defined in [store/configureStore.js:6](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/configureStore.js#L6)*

___

### createStore

•  **createStore**: StoreCreator

*Defined in [store/configureStore.js:4](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/configureStore.js#L4)*

___

### dataReducer

• `Const` **dataReducer**: (Anonymous function) = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]: (\_, { payload: { content: { data } } }) => data, [TYPE\_ACTION\_UPDATE\_MESSAGE]: (state, { payload: { content: { data } } }) => data})

*Defined in [store/reducers/data.js:14](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/data.js#L14)*

Data string state

**`param`** 

**`param`** 

___

### loggerMiddleware

• `Const` **loggerMiddleware**: [loggerMiddleware](globals.md#loggermiddleware) = require('./middlewares/loggerMiddleware')

*Defined in [store/configureStore.js:7](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/configureStore.js#L7)*

___

### messageReducer

• `Const` **messageReducer**: (Anonymous function) = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]:(state) => ({ type: GraphType.GRAPH\_MESSAGE, parent: state \|\| null, id: '@uuid', user: '@user', content: '@content', cdate: '@timestamp', mdate: '@timestamp', }), [TYPE\_ACTION\_UPDATE\_MESSAGE]: recursiveReducer((state, { payload }) => { const { messageId } = payload; if (state.id === messageId) { assert(payload.user.peerId === state.user.peerId, TYPE\_ERROR\_USER\_MUST\_BE\_THE\_OWNER, 'message') return { ...state, content: '@content', mdate: '@timestamp', } } else { assert(state.parent, TYPE\_ERROR\_MISSING\_RESOURCE\_ID, 'Message', messageId) } }), [TYPE\_ACTION\_DELETE\_MESSAGE]: recursiveReducer((state, { payload }) => { const { messageId } = payload; if (state.id === messageId) { assert(payload.user.peerId === state.user.peerId, TYPE\_ERROR\_USER\_MUST\_BE\_THE\_OWNER, 'message') return state.parent } else { assert(state.parent, TYPE\_ERROR\_MISSING\_RESOURCE\_ID, 'Message', messageId) } })})

*Defined in [store/reducers/message.js:29](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L29)*

Message reducer

**`param`** 

**`param`** 

___

### monitorReducerEnhancer

• `Const` **monitorReducerEnhancer**: [monitorReducerEnhancer](globals.md#monitorreducerenhancer) = require('./enhancers/monitorReducerEnhancer')

*Defined in [store/configureStore.js:5](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/configureStore.js#L5)*

___

### recursiveReducer

• `Const` **recursiveReducer**: [recursiveReducer](globals.md#recursivereducer) = require('./recursive')

*Defined in [store/reducers/message.js:21](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L21)*

___

### topicReducer

• `Const` **topicReducer**: (Anonymous function) = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]: ({ count = 0 } = {}) => ({ type: GraphType.GRAPH\_TOPIC, message: '@message', count: count + 1 }), [TYPE\_ACTION\_UPDATE\_MESSAGE]: (state) => ({ ...state, message: '@message', }), [TYPE\_ACTION\_DELETE\_MESSAGE]: (state) => state.count === 1 ? null : ({ ...state, message: '@message', count: state.count - 1 })})

*Defined in [store/reducers/topic.js:22](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topic.js#L22)*

Topic reducer

**`param`** 

**`param`** 

___

### topicsReducer

• `Const` **topicsReducer**: (Anonymous function) = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]: (state, { payload: { topicId } }) => ({ ...state, [topicId]: '@topic' }), [TYPE\_ACTION\_UPDATE\_MESSAGE]: (state, { payload: { topicId } }) => { assert(state && state[topicId], TYPE\_ERROR\_MISSING\_RESOURCE\_ID, 'Topic', topicId); return { ...state, [topicId]: '@topic' } }, [TYPE\_ACTION\_DELETE\_MESSAGE]: (state, { payload: { topicId } }) => { assert(state && state[topicId], TYPE\_ERROR\_MISSING\_RESOURCE\_ID, 'Topic', topicId); return { ...state, [topicId]: '@topic' } }})

*Defined in [store/reducers/topics.js:26](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topics.js#L26)*

Topic reducer

**`param`** 

**`param`** 

___

### userReducer

• `Const` **userReducer**: (Anonymous function) = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]: (\_, { payload: { user: { avatar, username, peerId } } = {} }) => ({ type: GraphType.GRAPH\_USER, username, peerId, avatar })})

*Defined in [store/reducers/user.js:17](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/user.js#L17)*

User reducer

**`param`** 

**`param`** 

## Functions

### configureStore

▸ `Const`**configureStore**(`rootReducer`: Reducer\<any, AnyAction>, `__namedParameters?`: { enhancer: StoreEnhancer\<{}, {}> ; preloadedState: any ; restOpts: restOpts  }): any

*Defined in [store/configureStore.js:22](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/configureStore.js#L22)*

Creates a store wrapping the default cuser enhancers

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`rootReducer` | Reducer\<any, AnyAction> | - |
`__namedParameters` | { enhancer: StoreEnhancer\<{}, {}> ; preloadedState: any ; restOpts: restOpts  } | {} |

**Returns:** any
