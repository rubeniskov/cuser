# @cuser/proto

## Index

### Classes

* [CuserPublisher](classes/cuserpublisher.md)

### Variables

* [TYPE\_ACTION\_DELETE\_MESSAGE](globals.md#type_action_delete_message)
* [TYPE\_ACTION\_PUBLISH\_MESSAGE](globals.md#type_action_publish_message)
* [TYPE\_ACTION\_UPDATE\_MESSAGE](globals.md#type_action_update_message)
* [createAction](globals.md#createaction)
* [createAuth](globals.md#createauth)
* [createCore](globals.md#createcore)
* [createStore](globals.md#createstore)

### Functions

* [createPublisher](globals.md#createpublisher)
* [isDagLink](globals.md#isdaglink)

## Variables

### TYPE\_ACTION\_DELETE\_MESSAGE

•  **TYPE\_ACTION\_DELETE\_MESSAGE**: any

*Defined in [publisher/publisher.js:22](https://github.com/rubeniskov/cuser/blob/730a1b1/packages/publisher/publisher.js#L22)*

___

### TYPE\_ACTION\_PUBLISH\_MESSAGE

•  **TYPE\_ACTION\_PUBLISH\_MESSAGE**: any

*Defined in [publisher/publisher.js:20](https://github.com/rubeniskov/cuser/blob/730a1b1/packages/publisher/publisher.js#L20)*

___

### TYPE\_ACTION\_UPDATE\_MESSAGE

•  **TYPE\_ACTION\_UPDATE\_MESSAGE**: any

*Defined in [publisher/publisher.js:21](https://github.com/rubeniskov/cuser/blob/730a1b1/packages/publisher/publisher.js#L21)*

___

### createAction

• `Const` **createAction**: any = require('@cuser/store/utils/createAction')

*Defined in [publisher/publisher.js:17](https://github.com/rubeniskov/cuser/blob/730a1b1/packages/publisher/publisher.js#L17)*

___

### createAuth

• `Const` **createAuth**: any = require('@cuser/auth')

*Defined in [publisher/publisher.js:15](https://github.com/rubeniskov/cuser/blob/730a1b1/packages/publisher/publisher.js#L15)*

___

### createCore

• `Const` **createCore**: any = require('@cuser/core')

*Defined in [publisher/publisher.js:14](https://github.com/rubeniskov/cuser/blob/730a1b1/packages/publisher/publisher.js#L14)*

___

### createStore

• `Const` **createStore**: any = require('@cuser/store')

*Defined in [publisher/publisher.js:16](https://github.com/rubeniskov/cuser/blob/730a1b1/packages/publisher/publisher.js#L16)*

## Functions

### createPublisher

▸ `Const`**createPublisher**(`node`: IPFSAPI \| Promise\<IPFSAPI>, `secret`: string, `opts`: CuserStoreOptions & CuserCoreOptions & CuserAuthOptions): [CuserPublisher](classes/cuserpublisher.md)

*Defined in [publisher/publisher.js:111](https://github.com/rubeniskov/cuser/blob/730a1b1/packages/publisher/publisher.js#L111)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise\<IPFSAPI> |
`secret` | string |
`opts` | CuserStoreOptions & CuserCoreOptions & CuserAuthOptions |

**Returns:** [CuserPublisher](classes/cuserpublisher.md)

___

### isDagLink

▸ `Const`**isDagLink**(`state`: any): boolean

*Defined in [publisher/publisher.js:25](https://github.com/rubeniskov/cuser/blob/730a1b1/packages/publisher/publisher.js#L25)*

#### Parameters:

Name | Type |
------ | ------ |
`state` | any |

**Returns:** boolean
