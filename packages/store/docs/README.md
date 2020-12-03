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
* [TYPE\_ACTION\_REHYDRATE](globals.md#type_action_rehydrate)
* [TYPE\_ACTION\_RESOLVED](globals.md#type_action_resolved)
* [TYPE\_ACTION\_SEAL](globals.md#type_action_seal)
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
* [dataReducer](globals.md#datareducer)
* [debug](globals.md#debug)
* [isPromise](globals.md#ispromise)
* [loggerMiddleware](globals.md#loggermiddleware)
* [messageReducer](globals.md#messagereducer)
* [monitorReducerEnhancer](globals.md#monitorreducerenhancer)
* [mutateJson](globals.md#mutatejson)
* [recursiveReducer](globals.md#recursivereducer)
* [reducerAliases](globals.md#reduceraliases)
* [rootReducer](globals.md#rootreducer)
* [serializeActions](globals.md#serializeactions)
* [topicReducer](globals.md#topicreducer)
* [topicsReducer](globals.md#topicsreducer)
* [userReducer](globals.md#userreducer)

### Functions

* [configureStore](globals.md#configurestore)
* [createSerializeEnhancer](globals.md#createserializeenhancer)
* [createStore](globals.md#createstore)
* [rehydrateReducer](globals.md#rehydratereducer)
* [sealReducer](globals.md#sealreducer)
* [wrapReducer](globals.md#wrapreducer)

### Object literals

* [phases](globals.md#phases)

## Variables

### GraphType

•  **GraphType**: GraphType

*Defined in [store/reducers/topic.js:8](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topic.js#L8)*

*Defined in [store/reducers/message.js:10](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L10)*

*Defined in [store/reducers/user.js:6](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/user.js#L6)*

*Defined in [store/reducers/content.js:9](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/content.js#L9)*

___

### TYPE\_ACTION\_DELETE\_MESSAGE

•  **TYPE\_ACTION\_DELETE\_MESSAGE**: string

*Defined in [store/reducers/topics.js:13](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topics.js#L13)*

*Defined in [store/reducers/topic.js:12](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topic.js#L12)*

*Defined in [store/reducers/message.js:14](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L14)*

___

### TYPE\_ACTION\_PUBLISH\_MESSAGE

•  **TYPE\_ACTION\_PUBLISH\_MESSAGE**: string

*Defined in [store/reducers/topics.js:11](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topics.js#L11)*

*Defined in [store/reducers/topic.js:10](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topic.js#L10)*

*Defined in [store/reducers/message.js:12](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L12)*

*Defined in [store/reducers/user.js:8](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/user.js#L8)*

*Defined in [store/reducers/content.js:10](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/content.js#L10)*

*Defined in [store/reducers/data.js:5](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/data.js#L5)*

___

### TYPE\_ACTION\_REHYDRATE

•  **TYPE\_ACTION\_REHYDRATE**: string

*Defined in [store/enhancers/createSerializeEnhancer.js:9](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/enhancers/createSerializeEnhancer.js#L9)*

*Defined in [store/createStore.js:12](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/createStore.js#L12)*

___

### TYPE\_ACTION\_RESOLVED

•  **TYPE\_ACTION\_RESOLVED**: string

*Defined in [store/enhancers/createSerializeEnhancer.js:8](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/enhancers/createSerializeEnhancer.js#L8)*

___

### TYPE\_ACTION\_SEAL

•  **TYPE\_ACTION\_SEAL**: string

*Defined in [store/enhancers/createSerializeEnhancer.js:10](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/enhancers/createSerializeEnhancer.js#L10)*

*Defined in [store/createStore.js:13](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/createStore.js#L13)*

___

### TYPE\_ACTION\_UPDATE\_MESSAGE

•  **TYPE\_ACTION\_UPDATE\_MESSAGE**: string

*Defined in [store/reducers/topics.js:12](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topics.js#L12)*

*Defined in [store/reducers/topic.js:11](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topic.js#L11)*

*Defined in [store/reducers/message.js:13](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L13)*

*Defined in [store/reducers/content.js:10](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/content.js#L10)*

*Defined in [store/reducers/data.js:5](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/data.js#L5)*

___

### TYPE\_ERROR\_MISSING\_PREVIOUS\_STATE

•  **TYPE\_ERROR\_MISSING\_PREVIOUS\_STATE**: string

*Defined in [store/reducers/content.js:11](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/content.js#L11)*

___

### TYPE\_ERROR\_MISSING\_RESOURCE\_ID

•  **TYPE\_ERROR\_MISSING\_RESOURCE\_ID**: string

*Defined in [store/reducers/topics.js:16](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topics.js#L16)*

*Defined in [store/reducers/message.js:18](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L18)*

___

### TYPE\_ERROR\_USER\_MUST\_BE\_THE\_OWNER

•  **TYPE\_ERROR\_USER\_MUST\_BE\_THE\_OWNER**: string

*Defined in [store/reducers/message.js:17](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L17)*

___

### applyMiddleware

•  **applyMiddleware**: applyMiddleware

*Defined in [store/configureStore.js:4](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/configureStore.js#L4)*

___

### assert

• `Const` **assert**: any = require('@cuser/utils/assert')

*Defined in [store/reducers/topics.js:8](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topics.js#L8)*

*Defined in [store/reducers/message.js:8](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L8)*

*Defined in [store/reducers/content.js:7](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/content.js#L7)*

___

### compose

•  **compose**: compose

*Defined in [store/configureStore.js:4](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/configureStore.js#L4)*

___

### contentReducer

• `Const` **contentReducer**: (Anonymous function) = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]: () => ({ type: GraphType.GRAPH\_CONTENT, parent: null, revision: '@revision', cdate: '@timestamp', data: '@data', }), [TYPE\_ACTION\_UPDATE\_MESSAGE]: (state) => { assert(state, TYPE\_ERROR\_MISSING\_PREVIOUS\_STATE); return { ...state, parent: state, revision: '@revision', cdate: '@timestamp', data: '@data', } }})

*Defined in [store/reducers/content.js:23](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/content.js#L23)*

Content reducer for manage message data and its historical revisions,
when update action, the current state will be swaped to parent in order
to keep the tree changes

**`param`** 

**`param`** 

___

### createReducer

• `Const` **createReducer**: [createReducer](globals.md#createreducer) = require('../utils/createReducer')

*Defined in [store/reducers/topics.js:19](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topics.js#L19)*

*Defined in [store/reducers/topic.js:15](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topic.js#L15)*

*Defined in [store/reducers/message.js:21](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L21)*

*Defined in [store/reducers/user.js:11](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/user.js#L11)*

*Defined in [store/reducers/content.js:13](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/content.js#L13)*

*Defined in [store/reducers/data.js:7](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/data.js#L7)*

___

### createResolveReducer

• `Const` **createResolveReducer**: [createResolveReducer](globals.md#createresolvereducer) = require('./createResolveReducer')

*Defined in [store/configureStore.js:6](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/configureStore.js#L6)*

___

### dataReducer

• `Const` **dataReducer**: (Anonymous function) = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]: (\_, { payload: { content: { data } } }) => data, [TYPE\_ACTION\_UPDATE\_MESSAGE]: (state, { payload: { content: { data } } }) => data})

*Defined in [store/reducers/data.js:15](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/data.js#L15)*

Data string state

**`param`** 

**`param`** 

___

### debug

• `Const` **debug**: Debugger = require('debug')('cuser:store-serializer')

*Defined in [store/enhancers/createSerializeEnhancer.js:6](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/enhancers/createSerializeEnhancer.js#L6)*

___

### isPromise

• `Const` **isPromise**: any = require('is-promise')

*Defined in [store/enhancers/createSerializeEnhancer.js:5](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/enhancers/createSerializeEnhancer.js#L5)*

___

### loggerMiddleware

• `Const` **loggerMiddleware**: [loggerMiddleware](globals.md#loggermiddleware) = require('./middlewares/loggerMiddleware')

*Defined in [store/configureStore.js:7](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/configureStore.js#L7)*

___

### messageReducer

• `Const` **messageReducer**: (Anonymous function) = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]:(state) => ({ type: GraphType.GRAPH\_MESSAGE, parent: state \|\| null, id: '@uuid', user: '@user', content: '@content', cdate: '@timestamp', mdate: '@timestamp', }), [TYPE\_ACTION\_UPDATE\_MESSAGE]: recursiveReducer((state, { payload }) => { const { messageId } = payload; if (state.id === messageId) { assert(payload.user.peerId === state.user.peerId, TYPE\_ERROR\_USER\_MUST\_BE\_THE\_OWNER, 'message') return { ...state, content: '@content', mdate: '@timestamp', } } else { assert(state.parent, TYPE\_ERROR\_MISSING\_RESOURCE\_ID, 'Message', messageId) } }), [TYPE\_ACTION\_DELETE\_MESSAGE]: recursiveReducer((state, { payload }) => { const { messageId } = payload; if (state.id === messageId) { assert(payload.user.peerId === state.user.peerId, TYPE\_ERROR\_USER\_MUST\_BE\_THE\_OWNER, 'message') return state.parent } else { assert(state.parent, TYPE\_ERROR\_MISSING\_RESOURCE\_ID, 'Message', messageId) } })})

*Defined in [store/reducers/message.js:31](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L31)*

Message reducer

**`param`** 

**`param`** 

___

### monitorReducerEnhancer

• `Const` **monitorReducerEnhancer**: [monitorReducerEnhancer](globals.md#monitorreducerenhancer) = require('./enhancers/monitorReducerEnhancer')

*Defined in [store/configureStore.js:5](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/configureStore.js#L5)*

___

### mutateJson

• `Const` **mutateJson**: any = require('mutant-json')

*Defined in [store/enhancers/createSerializeEnhancer.js:4](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/enhancers/createSerializeEnhancer.js#L4)*

___

### recursiveReducer

• `Const` **recursiveReducer**: [recursiveReducer](globals.md#recursivereducer) = require('./recursive')

*Defined in [store/reducers/message.js:23](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/message.js#L23)*

___

### reducerAliases

• `Const` **reducerAliases**: object = require('./reducers/aliases')

*Defined in [store/createStore.js:9](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/createStore.js#L9)*

___

### rootReducer

• `Const` **rootReducer**: (Anonymous function) = require('./reducers')

*Defined in [store/createStore.js:8](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/createStore.js#L8)*

___

### serializeActions

• `Const` **serializeActions**: string[] = [ TYPE\_ACTION\_RESOLVED, TYPE\_ACTION\_REHYDRATE, TYPE\_ACTION\_RESOLVED]

*Defined in [store/enhancers/createSerializeEnhancer.js:13](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/enhancers/createSerializeEnhancer.js#L13)*

___

### topicReducer

• `Const` **topicReducer**: (Anonymous function) = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]: ({ count = 0 } = {}) => ({ type: GraphType.GRAPH\_TOPIC, message: '@message', count: count + 1 }), [TYPE\_ACTION\_UPDATE\_MESSAGE]: (state) => ({ ...state, message: '@message', }), [TYPE\_ACTION\_DELETE\_MESSAGE]: (state) => state.count === 1 ? null : ({ ...state, message: '@message', count: state.count - 1 })})

*Defined in [store/reducers/topic.js:23](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topic.js#L23)*

Topic reducer

**`param`** 

**`param`** 

___

### topicsReducer

• `Const` **topicsReducer**: (Anonymous function) = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]: (state, { payload: { topicId } }) => ({ ...state, [topicId]: '@topic' }), [TYPE\_ACTION\_UPDATE\_MESSAGE]: (state, { payload: { topicId } }) => { assert(state && state[topicId], TYPE\_ERROR\_MISSING\_RESOURCE\_ID, 'Topic', topicId); return { ...state, [topicId]: '@topic' } }, [TYPE\_ACTION\_DELETE\_MESSAGE]: (state, { payload: { topicId } }) => { assert(state && state[topicId], TYPE\_ERROR\_MISSING\_RESOURCE\_ID, 'Topic', topicId); return { ...state, [topicId]: '@topic' } }})

*Defined in [store/reducers/topics.js:27](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/topics.js#L27)*

Topic reducer

**`param`** 

**`param`** 

___

### userReducer

• `Const` **userReducer**: (Anonymous function) = createReducer({ // @ts-ignore [TYPE\_ACTION\_PUBLISH\_MESSAGE]: (\_, { payload: { user: { avatar, username, peerId } } = {} }) => ({ type: GraphType.GRAPH\_USER, username, peerId, avatar })})

*Defined in [store/reducers/user.js:18](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/reducers/user.js#L18)*

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

___

### createSerializeEnhancer

▸ `Const`**createSerializeEnhancer**(`opts`: CuserSerializeEnhancerOptions): (Anonymous function)

*Defined in [store/enhancers/createSerializeEnhancer.js:37](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/enhancers/createSerializeEnhancer.js#L37)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`opts` | CuserSerializeEnhancerOptions |   |

**Returns:** (Anonymous function)

___

### createStore

▸ `Const`**createStore**(`opts`: CuserSerializeEnhancerOptions): Store\<any, AnyAction> & CuserStore

*Defined in [store/createStore.js:51](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/createStore.js#L51)*

#### Parameters:

Name | Type |
------ | ------ |
`opts` | CuserSerializeEnhancerOptions |

**Returns:** Store\<any, AnyAction> & CuserStore

___

### rehydrateReducer

▸ `Const`**rehydrateReducer**(`state`: any, `__namedParameters`: { type: any  }, `__namedParameters`: { deserialize: any ; isDeserializable: any  }): any

*Defined in [store/createStore.js:16](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/createStore.js#L16)*

#### Parameters:

Name | Type |
------ | ------ |
`state` | any |
`__namedParameters` | { type: any  } |
`__namedParameters` | { deserialize: any ; isDeserializable: any  } |

**Returns:** any

___

### sealReducer

▸ `Const`**sealReducer**(`state`: any, `__namedParameters`: { type: any  }, `__namedParameters`: { isSerializable: any ; serialize: any  }): any

*Defined in [store/createStore.js:23](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/createStore.js#L23)*

#### Parameters:

Name | Type |
------ | ------ |
`state` | any |
`__namedParameters` | { type: any  } |
`__namedParameters` | { isSerializable: any ; serialize: any  } |

**Returns:** any

___

### wrapReducer

▸ `Const`**wrapReducer**(`reducer`: any, `wrapOpts`: any): (Anonymous function)

*Defined in [store/createStore.js:30](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/createStore.js#L30)*

#### Parameters:

Name | Type |
------ | ------ |
`reducer` | any |
`wrapOpts` | any |

**Returns:** (Anonymous function)

## Object literals

### phases

▪ `Const` **phases**: object

*Defined in [store/enhancers/createSerializeEnhancer.js:19](https://github.com/rubeniskov/cuser/blob/db032fa/packages/store/enhancers/createSerializeEnhancer.js#L19)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`IDLE` | number | 0 |
`REHYDRATING` | number | 2 |
`SEALING` | number | 1 |
