# @cuser/proto

## Index

### Classes

* [CuserPublisher](classes/cuserpublisher.md)

### Variables

* [CuserAuth](globals.md#cuserauth)
* [CuserCore](globals.md#cusercore)
* [TYPE\_ACTION\_DELETE\_MESSAGE](globals.md#type_action_delete_message)
* [TYPE\_ACTION\_PUBLISH\_MESSAGE](globals.md#type_action_publish_message)
* [TYPE\_ACTION\_UPDATE\_MESSAGE](globals.md#type_action_update_message)
* [configureStore](globals.md#configurestore)
* [createAction](globals.md#createaction)

### Functions

* [createPublisher](globals.md#createpublisher)
* [isDagLink](globals.md#isdaglink)

## Variables

### CuserAuth

•  **CuserAuth**: [CuserAuth](globals.md#cuserauth)

*Defined in [publisher/publisher.js:13](https://github.com/rubeniskov/cuser/blob/45e5718/packages/publisher/publisher.js#L13)*

___

### CuserCore

•  **CuserCore**: [CuserCore](globals.md#cusercore)

*Defined in [publisher/publisher.js:12](https://github.com/rubeniskov/cuser/blob/45e5718/packages/publisher/publisher.js#L12)*

___

### TYPE\_ACTION\_DELETE\_MESSAGE

•  **TYPE\_ACTION\_DELETE\_MESSAGE**: string

*Defined in [publisher/publisher.js:20](https://github.com/rubeniskov/cuser/blob/45e5718/packages/publisher/publisher.js#L20)*

___

### TYPE\_ACTION\_PUBLISH\_MESSAGE

•  **TYPE\_ACTION\_PUBLISH\_MESSAGE**: string

*Defined in [publisher/publisher.js:18](https://github.com/rubeniskov/cuser/blob/45e5718/packages/publisher/publisher.js#L18)*

___

### TYPE\_ACTION\_UPDATE\_MESSAGE

•  **TYPE\_ACTION\_UPDATE\_MESSAGE**: string

*Defined in [publisher/publisher.js:19](https://github.com/rubeniskov/cuser/blob/45e5718/packages/publisher/publisher.js#L19)*

___

### configureStore

• `Const` **configureStore**: [configureStore](globals.md#configurestore) = require('@cuser/store')

*Defined in [publisher/publisher.js:14](https://github.com/rubeniskov/cuser/blob/45e5718/packages/publisher/publisher.js#L14)*

___

### createAction

• `Const` **createAction**: [createAction](globals.md#createaction) = require('@cuser/store/utils/createAction')

*Defined in [publisher/publisher.js:15](https://github.com/rubeniskov/cuser/blob/45e5718/packages/publisher/publisher.js#L15)*

## Functions

### createPublisher

▸ `Const`**createPublisher**(`core`: [CuserCore](globals.md#cusercore), `auth`: [CuserAuth](globals.md#cuserauth), `opts`: CuserPublisherOptions & CuserStoreSerializeReducerOptions & CuserSerializeOptions & CuserDeserializeOptions): [CuserPublisher](classes/cuserpublisher.md)

*Defined in [publisher/publisher.js:114](https://github.com/rubeniskov/cuser/blob/45e5718/packages/publisher/publisher.js#L114)*

#### Parameters:

Name | Type |
------ | ------ |
`core` | [CuserCore](globals.md#cusercore) |
`auth` | [CuserAuth](globals.md#cuserauth) |
`opts` | CuserPublisherOptions & CuserStoreSerializeReducerOptions & CuserSerializeOptions & CuserDeserializeOptions |

**Returns:** [CuserPublisher](classes/cuserpublisher.md)

___

### isDagLink

▸ `Const`**isDagLink**(`state`: any): boolean

*Defined in [publisher/publisher.js:23](https://github.com/rubeniskov/cuser/blob/45e5718/packages/publisher/publisher.js#L23)*

#### Parameters:

Name | Type |
------ | ------ |
`state` | any |

**Returns:** boolean
