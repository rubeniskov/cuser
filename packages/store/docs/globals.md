# @cuser/proto

## Index

### Variables

* [GraphType](docs/globals.md#graphtype)
* [TYPE\_ACTION\_DEFAULT](docs/globals.md#type_action_default)
* [TYPE\_ACTION\_DELETE\_MESSAGE](docs/globals.md#type_action_delete_message)
* [TYPE\_ACTION\_PUBLISH\_MESSAGE](docs/globals.md#type_action_publish_message)
* [TYPE\_ACTION\_REHYDRATE](docs/globals.md#type_action_rehydrate)
* [TYPE\_ACTION\_SEAL](docs/globals.md#type_action_seal)
* [TYPE\_ACTION\_UPDATE\_MESSAGE](docs/globals.md#type_action_update_message)
* [TYPE\_ERROR\_INVALID\_ACTION](docs/globals.md#type_error_invalid_action)
* [TYPE\_ERROR\_INVALID\_STATE](docs/globals.md#type_error_invalid_state)
* [TYPE\_ERROR\_MISSING\_PREVIOUS\_STATE](docs/globals.md#type_error_missing_previous_state)
* [TYPE\_ERROR\_MISSING\_RESOURCE\_ID](docs/globals.md#type_error_missing_resource_id)
* [TYPE\_ERROR\_USER\_MUST\_BE\_THE\_OWNER](docs/globals.md#type_error_user_must_be_the_owner)
* [actions](docs/globals.md#actions)
* [applyMiddleware](docs/globals.md#applymiddleware)
* [assert](docs/globals.md#assert)
* [compose](docs/globals.md#compose)
* [contentReducer](docs/globals.md#contentreducer)
* [createIterator](docs/globals.md#createiterator)
* [createReduxStore](docs/globals.md#createreduxstore)
* [dataReducer](docs/globals.md#datareducer)
* [debug](docs/globals.md#debug)
* [format](docs/globals.md#format)
* [isAlias](docs/globals.md#isalias)
* [isPromise](docs/globals.md#ispromise)
* [isReducer](docs/globals.md#isreducer)
* [loggerMiddleware](docs/globals.md#loggermiddleware)
* [messageReducer](docs/globals.md#messagereducer)
* [minimatch](docs/globals.md#minimatch)
* [monitorReducerEnhancer](docs/globals.md#monitorreducerenhancer)
* [mutantJson](docs/globals.md#mutantjson)
* [mutateJson](docs/globals.md#mutatejson)
* [rootReducer](docs/globals.md#rootreducer)
* [tap](docs/globals.md#tap)
* [topicReducer](docs/globals.md#topicreducer)
* [topicsReducer](docs/globals.md#topicsreducer)
* [userReducer](docs/globals.md#userreducer)
* [validator](docs/globals.md#validator)

### Functions

* [configureStore](docs/globals.md#configurestore)
* [createReducer](docs/globals.md#createreducer)
* [createRehydrateReducer](docs/globals.md#createrehydratereducer)
* [createResolveReducer](docs/globals.md#createresolvereducer)
* [createSealReducer](docs/globals.md#createsealreducer)
* [createSerializeEnhancer](docs/globals.md#createserializeenhancer)
* [createSerializeReducer](docs/globals.md#createserializereducer)
* [createStore](docs/globals.md#createstore)
* [parseAliasReducer](docs/globals.md#parsealiasreducer)
* [parseMapping](docs/globals.md#parsemapping)
* [recursiveReducer](docs/globals.md#recursivereducer)
* [wrapReducerAction](docs/globals.md#wrapreduceraction)
* [wrapValidatorStateReducer](docs/globals.md#wrapvalidatorstatereducer)

### Object literals

* [phases](docs/globals.md#phases)

## Variables

### GraphType

•  **GraphType**: GraphType

*Defined in [store/reducers/content.js:9](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/content.js#L9)*

*Defined in [store/reducers/message.js:10](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/message.js#L10)*

*Defined in [store/reducers/topic.js:8](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/topic.js#L8)*

*Defined in [store/reducers/user.js:6](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/user.js#L6)*

___

### TYPE\_ACTION\_DEFAULT

•  **TYPE\_ACTION\_DEFAULT**: string

*Defined in [store/reducers/topics.js:14](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/topics.js#L14)*

___

### TYPE\_ACTION\_DELETE\_MESSAGE

•  **TYPE\_ACTION\_DELETE\_MESSAGE**: string

*Defined in [store/reducers/message.js:14](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/message.js#L14)*

*Defined in [store/reducers/topic.js:12](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/topic.js#L12)*

*Defined in [store/reducers/topics.js:13](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/topics.js#L13)*

___

### TYPE\_ACTION\_PUBLISH\_MESSAGE

•  **TYPE\_ACTION\_PUBLISH\_MESSAGE**: string

*Defined in [store/reducers/content.js:10](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/content.js#L10)*

*Defined in [store/reducers/data.js:5](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/data.js#L5)*

*Defined in [store/reducers/message.js:12](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/message.js#L12)*

*Defined in [store/reducers/topic.js:10](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/topic.js#L10)*

*Defined in [store/reducers/topics.js:11](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/topics.js#L11)*

*Defined in [store/reducers/user.js:8](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/user.js#L8)*

___

### TYPE\_ACTION\_REHYDRATE

•  **TYPE\_ACTION\_REHYDRATE**: string

*Defined in [store/enhancers/createSerializeEnhancer.js:11](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/enhancers/createSerializeEnhancer.js#L11)*

___

### TYPE\_ACTION\_SEAL

•  **TYPE\_ACTION\_SEAL**: string

*Defined in [store/enhancers/createSerializeEnhancer.js:12](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/enhancers/createSerializeEnhancer.js#L12)*

___

### TYPE\_ACTION\_UPDATE\_MESSAGE

•  **TYPE\_ACTION\_UPDATE\_MESSAGE**: string

*Defined in [store/reducers/content.js:10](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/content.js#L10)*

*Defined in [store/reducers/data.js:5](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/data.js#L5)*

*Defined in [store/reducers/message.js:13](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/message.js#L13)*

*Defined in [store/reducers/topic.js:11](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/topic.js#L11)*

*Defined in [store/reducers/topics.js:12](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/topics.js#L12)*

___

### TYPE\_ERROR\_INVALID\_ACTION

•  **TYPE\_ERROR\_INVALID\_ACTION**: \"Invalid action format for "%s"\"

*Defined in [store/utils/wrapValidatorActionReducer.js:8](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/wrapValidatorActionReducer.js#L8)*

___

### TYPE\_ERROR\_INVALID\_STATE

•  **TYPE\_ERROR\_INVALID\_STATE**: \"Invalid state format for "%s"\"

*Defined in [store/utils/wrapValidatorStateReducer.js:8](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/wrapValidatorStateReducer.js#L8)*

___

### TYPE\_ERROR\_MISSING\_PREVIOUS\_STATE

•  **TYPE\_ERROR\_MISSING\_PREVIOUS\_STATE**: \"Previous state does't exists\"

*Defined in [store/reducers/content.js:11](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/content.js#L11)*

___

### TYPE\_ERROR\_MISSING\_RESOURCE\_ID

•  **TYPE\_ERROR\_MISSING\_RESOURCE\_ID**: \"%s with id "%s" doesn't exists\"

*Defined in [store/reducers/message.js:18](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/message.js#L18)*

*Defined in [store/reducers/topics.js:17](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/topics.js#L17)*

___

### TYPE\_ERROR\_USER\_MUST\_BE\_THE\_OWNER

•  **TYPE\_ERROR\_USER\_MUST\_BE\_THE\_OWNER**: \"User must be the owner of the %s\"

*Defined in [store/reducers/message.js:17](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/message.js#L17)*

___

### actions

• `Const` **actions**: "/Users/rubeniskov/Workspace/cuser/packages/store/types/actions" = require('../types/actions')

*Defined in [store/utils/createReducer.js:4](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/createReducer.js#L4)*

___

### applyMiddleware

•  **applyMiddleware**: applyMiddleware

*Defined in [store/createStore.js:5](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/createStore.js#L5)*

___

### assert

• `Const` **assert**: [assert](docs/globals.md#assert) = require('@cuser/utils/assert')

*Defined in [store/reducers/content.js:7](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/content.js#L7)*

*Defined in [store/reducers/message.js:8](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/message.js#L8)*

*Defined in [store/reducers/topics.js:8](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/topics.js#L8)*

___

### compose

•  **compose**: compose

*Defined in [store/createStore.js:5](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/createStore.js#L5)*

___

### contentReducer

• `Const` **contentReducer**: Reducer = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]: () =\> ({ type: GraphType.GRAPH\_CONTENT, parent: null, revision: '@revision', cdate: '@timestamp', data: '@data', }), [TYPE\_ACTION\_UPDATE\_MESSAGE]: (state) =\> { assert(state, TYPE\_ERROR\_MISSING\_PREVIOUS\_STATE); return { ...state, parent: state, revision: '@revision', cdate: '@timestamp', data: '@data', } }})

*Defined in [store/reducers/content.js:23](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/content.js#L23)*

Content reducer for manage message data and its historical revisions,
when update action, the current state will be swaped to parent in order
to keep the tree changes

**`param`** 

**`param`** 

___

### createIterator

•  **createIterator**: any

*Defined in [store/enhancers/createSerializeReducer.js:9](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/enhancers/createSerializeReducer.js#L9)*

___

### createReduxStore

•  **createReduxStore**: StoreCreator

*Defined in [store/createStore.js:5](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/createStore.js#L5)*

___

### dataReducer

• `Const` **dataReducer**: Reducer = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]: (\_, { payload: { content: { data } } }) =\> data, [TYPE\_ACTION\_UPDATE\_MESSAGE]: (state, { payload: { content: { data } } }) =\> data})

*Defined in [store/reducers/data.js:15](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/data.js#L15)*

Data string state

**`param`** 

**`param`** 

___

### debug

• `Const` **debug**: Debugger = require('debug')('cuser:store:serializer')

*Defined in [store/enhancers/createSerializeEnhancer.js:9](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/enhancers/createSerializeEnhancer.js#L9)*

___

### format

•  **format**: format

*Defined in [store/utils/wrapValidatorActionReducer.js:6](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/wrapValidatorActionReducer.js#L6)*

*Defined in [store/utils/wrapValidatorStateReducer.js:6](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/wrapValidatorStateReducer.js#L6)*

___

### isAlias

• `Const` **isAlias**: [isAlias](docs/globals.md#isalias) = require('./isAlias')

*Defined in [store/utils/createResolveReducer.js:8](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/createResolveReducer.js#L8)*

___

### isPromise

• `Const` **isPromise**: [isPromise](docs/globals.md#ispromise) = require('@cuser/utils/isPromise')

*Defined in [store/reducers/recursive.js:7](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/recursive.js#L7)*

___

### isReducer

• `Const` **isReducer**: [isReducer](docs/globals.md#isreducer) = require('./isReducer')

*Defined in [store/utils/createResolveReducer.js:9](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/createResolveReducer.js#L9)*

___

### loggerMiddleware

• `Const` **loggerMiddleware**: [loggerMiddleware](docs/globals.md#loggermiddleware) = require('./middlewares/loggerMiddleware')

*Defined in [store/createStore.js:7](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/createStore.js#L7)*

___

### messageReducer

• `Const` **messageReducer**: Reducer = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]: (state) =\> ({ type: GraphType.GRAPH\_MESSAGE, parent: state \|\| null, id: '@uuid', user: '@user', content: '@content', cdate: '@timestamp', mdate: '@timestamp', }), [TYPE\_ACTION\_UPDATE\_MESSAGE]: recursiveReducer((state, { payload }) =\> { const { messageId } = payload; if (state && state.id === messageId) { assert(payload.user.peerId === state.user.peerId, TYPE\_ERROR\_USER\_MUST\_BE\_THE\_OWNER, 'message') return { ...state, content: '@content', mdate: '@timestamp', } } else { assert(state.parent, TYPE\_ERROR\_MISSING\_RESOURCE\_ID, 'Message', messageId) } }), [TYPE\_ACTION\_DELETE\_MESSAGE]: recursiveReducer((state, { payload }) =\> { const { messageId } = payload; if (state && state.id === messageId) { assert(payload.user.peerId === state.user.peerId, TYPE\_ERROR\_USER\_MUST\_BE\_THE\_OWNER, 'message') return state.parent } else { assert(state.parent, TYPE\_ERROR\_MISSING\_RESOURCE\_ID, 'Message', messageId) } })})

*Defined in [store/reducers/message.js:31](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/message.js#L31)*

Message reducer

**`param`** 

**`param`** 

___

### minimatch

• `Const` **minimatch**: M = require('minimatch')

*Defined in [store/enhancers/createSerializeReducer.js:8](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/enhancers/createSerializeReducer.js#L8)*

___

### monitorReducerEnhancer

• `Const` **monitorReducerEnhancer**: [monitorReducerEnhancer](docs/globals.md#monitorreducerenhancer) = require('./enhancers/monitorReducerEnhancer')

*Defined in [store/createStore.js:6](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/createStore.js#L6)*

___

### mutantJson

• `Const` **mutantJson**: any = require('mutant-json')

*Defined in [store/utils/createResolveReducer.js:6](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/createResolveReducer.js#L6)*

___

### mutateJson

• `Const` **mutateJson**: any = require('mutant-json')

*Defined in [store/enhancers/createSerializeReducer.js:6](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/enhancers/createSerializeReducer.js#L6)*

*Defined in [store/reducers/recursive.js:6](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/recursive.js#L6)*

___

### rootReducer

• `Const` **rootReducer**: (state: any, action: AnyAction) => any = require('./reducers')

*Defined in [store/configureStore.js:11](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/configureStore.js#L11)*

___

### tap

• `Const` **tap**: any = require('mutant-json/tap')

*Defined in [store/enhancers/createSerializeReducer.js:7](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/enhancers/createSerializeReducer.js#L7)*

*Defined in [store/utils/createResolveReducer.js:7](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/createResolveReducer.js#L7)*

___

### topicReducer

• `Const` **topicReducer**: Reducer = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]: ({ count = 0 } = {}) =\> ({ type: GraphType.GRAPH\_TOPIC, message: '@message', count: count + 1 }), [TYPE\_ACTION\_UPDATE\_MESSAGE]: (state) =\> ({ ...state, message: '@message', }), [TYPE\_ACTION\_DELETE\_MESSAGE]: (state) =\> ({ ...state, message: '@message', count: state.count - 1 })})

*Defined in [store/reducers/topic.js:23](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/topic.js#L23)*

Topic reducer

**`param`** 

**`param`** 

___

### topicsReducer

• `Const` **topicsReducer**: Reducer = createReducer({ [TYPE\_ACTION\_PUBLISH\_MESSAGE]: (state, { payload: { topicId } }) =\> ({ ...state, [topicId]: '@topic' }), [TYPE\_ACTION\_UPDATE\_MESSAGE]: (state, { payload: { topicId } }) =\> { assert(state && state[topicId], TYPE\_ERROR\_MISSING\_RESOURCE\_ID, 'Topic', topicId); return { ...state, [topicId]: '@topic' } }, [TYPE\_ACTION\_DELETE\_MESSAGE]: (state, { payload: { topicId } }) =\> { assert(state && state[topicId], TYPE\_ERROR\_MISSING\_RESOURCE\_ID, 'Topic', topicId); return { ...state, [topicId]: '@topic' } }})

*Defined in [store/reducers/topics.js:28](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/topics.js#L28)*

Topic reducer

**`param`** 

**`param`** 

___

### userReducer

• `Const` **userReducer**: Reducer = createReducer({ // @ts-ignore [TYPE\_ACTION\_PUBLISH\_MESSAGE]: (\_, { payload: { user: { avatar, username, peerId } } = {} }) =\> ({ type: GraphType.GRAPH\_USER, username, peerId, avatar })})

*Defined in [store/reducers/user.js:18](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/user.js#L18)*

User reducer

**`param`** 

**`param`** 

___

### validator

• `Const` **validator**: createValidator = require('@cuser/validator')

*Defined in [store/utils/wrapValidatorActionReducer.js:5](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/wrapValidatorActionReducer.js#L5)*

*Defined in [store/utils/wrapValidatorStateReducer.js:5](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/wrapValidatorStateReducer.js#L5)*

## Functions

### configureStore

▸ `Const`**configureStore**(`preloadedState`: string \| {}, `opts`: CuserSerializeEnhancerOptions): Store<any, AnyAction\>

*Defined in [store/configureStore.js:22](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/configureStore.js#L22)*

#### Parameters:

Name | Type |
------ | ------ |
`preloadedState` | string \| {} |
`opts` | CuserSerializeEnhancerOptions |

**Returns:** Store<any, AnyAction\>

___

### createReducer

▸ `Const`**createReducer**(`mutations`: Record<string, Reducer<any, AnyAction\>\>): Reducer<any, AnyAction\>

*Defined in [store/utils/createReducer.js:12](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/createReducer.js#L12)*

#### Parameters:

Name | Type |
------ | ------ |
`mutations` | Record<string, Reducer<any, AnyAction\>\> |

**Returns:** Reducer<any, AnyAction\>

___

### createRehydrateReducer

▸ `Const`**createRehydrateReducer**(`__namedParameters`: { deserialize: (state: string) => Promise<any\> ; deserializable: () => true  }): rehydrateReducer

*Defined in [store/enhancers/createSerializeEnhancer.js:77](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/enhancers/createSerializeEnhancer.js#L77)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { deserialize: (state: string) => Promise<any\> ; deserializable: () => true  } |

**Returns:** rehydrateReducer

___

### createResolveReducer

▸ `Const`**createResolveReducer**(`rootReducer`: Reducer<any, AnyAction\>, `opts`: any): resolveReducer

*Defined in [store/utils/createResolveReducer.js:24](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/createResolveReducer.js#L24)*

#### Parameters:

Name | Type |
------ | ------ |
`rootReducer` | Reducer<any, AnyAction\> |
`opts` | any |

**Returns:** resolveReducer

___

### createSealReducer

▸ `Const`**createSealReducer**(`__namedParameters`: { serialize: (state: any) => Promise<string\> ; serializable: () => true  }): sealReducer

*Defined in [store/enhancers/createSerializeEnhancer.js:94](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/enhancers/createSerializeEnhancer.js#L94)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { serialize: (state: any) => Promise<string\> ; serializable: () => true  } |

**Returns:** sealReducer

___

### createSerializeEnhancer

▸ `Const`**createSerializeEnhancer**(`patterns`: string[], `opts`: CuserStoreSerializeReducerOptions & CuserSerializeOptions & CuserDeserializeOptions): (Anonymous function)

*Defined in [store/enhancers/createSerializeEnhancer.js:112](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/enhancers/createSerializeEnhancer.js#L112)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`patterns` | string[] |  |
`opts` | CuserStoreSerializeReducerOptions & CuserSerializeOptions & CuserDeserializeOptions |   |

**Returns:** (Anonymous function)

___

### createSerializeReducer

▸ `Const`**createSerializeReducer**(`reducer`: Reducer<any, AnyAction\>, `patterns`: string[], `opts`: CuserStoreSerializeReducerOptions): serializeReducer

*Defined in [store/enhancers/createSerializeReducer.js:24](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/enhancers/createSerializeReducer.js#L24)*

#### Parameters:

Name | Type |
------ | ------ |
`reducer` | Reducer<any, AnyAction\> |
`patterns` | string[] |
`opts` | CuserStoreSerializeReducerOptions |

**Returns:** serializeReducer

___

### createStore

▸ `Const`**createStore**(`rootReducer`: Reducer<any, AnyAction\>, `preloadedState`: any, `enhancer`: Function): Store<any, AnyAction\>

*Defined in [store/createStore.js:22](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/createStore.js#L22)*

#### Parameters:

Name | Type |
------ | ------ |
`rootReducer` | Reducer<any, AnyAction\> |
`preloadedState` | any |
`enhancer` | Function |

**Returns:** Store<any, AnyAction\>

___

### parseAliasReducer

▸ `Const`**parseAliasReducer**(`reducer`: any): any[]

*Defined in [store/utils/createResolveReducer.js:11](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/createResolveReducer.js#L11)*

#### Parameters:

Name | Type |
------ | ------ |
`reducer` | any |

**Returns:** any[]

___

### parseMapping

▸ `Const`**parseMapping**(`mapping`: string \| any[]): any[]

*Defined in [store/utils/parseMapping.js:7](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/parseMapping.js#L7)*

#### Parameters:

Name | Type |
------ | ------ |
`mapping` | string \| any[] |

**Returns:** any[]

___

### recursiveReducer

▸ `Const`**recursiveReducer**(`reducer`: Reducer<any, AnyAction\>, `opts`: any): (Anonymous function)

*Defined in [store/reducers/recursive.js:14](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/reducers/recursive.js#L14)*

Creates a recursive reducer for a certain key by, default parent

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`reducer` | Reducer<any, AnyAction\> |  |
`opts` | any |   |

**Returns:** (Anonymous function)

___

### wrapReducerAction

▸ `Const`**wrapReducerAction**(`schema`: any, `reducer?`: Reducer<any, AnyAction\>): actionValidateReducer

*Defined in [store/utils/wrapValidatorActionReducer.js:16](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/wrapValidatorActionReducer.js#L16)*

Creates a state validator reducer

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`schema` | any | - |  |
`reducer` | Reducer<any, AnyAction\> | (state, action) =\> state |   |

**Returns:** actionValidateReducer

___

### wrapValidatorStateReducer

▸ `Const`**wrapValidatorStateReducer**(`schema`: any, `reducer?`: Reducer<any, AnyAction\>): stateValidateReducer

*Defined in [store/utils/wrapValidatorStateReducer.js:16](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/utils/wrapValidatorStateReducer.js#L16)*

Creates a state validator reducer

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`schema` | any | - |  |
`reducer` | Reducer<any, AnyAction\> | (state, action) =\> state |   |

**Returns:** stateValidateReducer

## Object literals

### phases

▪ `Const` **phases**: object

*Defined in [store/enhancers/createSerializeEnhancer.js:16](https://github.com/rubeniskov/cuser/blob/d0809ed/packages/store/enhancers/createSerializeEnhancer.js#L16)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`IDLE` | number | 0 |
`REHYDRATING` | number | 2 |
`SEALING` | number | 1 |
