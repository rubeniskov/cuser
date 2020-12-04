# @cuser/proto

## Index

### Classes

* [CuserPublisher](classes/cuserpublisher.md)

### Variables

* [TYPE\_ACTION\_DELETE\_MESSAGE](globals.md#type_action_delete_message)
* [TYPE\_ACTION\_PUBLISH\_MESSAGE](globals.md#type_action_publish_message)
* [TYPE\_ACTION\_UPDATE\_MESSAGE](globals.md#type_action_update_message)
* [createAction](globals.md#createaction)
* [createStore](globals.md#createstore)

### Functions

* [createPublisher](globals.md#createpublisher)
* [isDagLink](globals.md#isdaglink)

## Variables

### TYPE\_ACTION\_DELETE\_MESSAGE

•  **TYPE\_ACTION\_DELETE\_MESSAGE**: any

*Defined in publisher/publisher.js:15*

___

### TYPE\_ACTION\_PUBLISH\_MESSAGE

•  **TYPE\_ACTION\_PUBLISH\_MESSAGE**: any

*Defined in publisher/publisher.js:13*

___

### TYPE\_ACTION\_UPDATE\_MESSAGE

•  **TYPE\_ACTION\_UPDATE\_MESSAGE**: any

*Defined in publisher/publisher.js:14*

___

### createAction

• `Const` **createAction**: any = require('@cuser/store/utils/createAction')

*Defined in publisher/publisher.js:10*

___

### createStore

• `Const` **createStore**: any = require('@cuser/store')

*Defined in publisher/publisher.js:9*

## Functions

### createPublisher

▸ `Const`**createPublisher**(`core`: CuserCore, `opts`: CuserStoreOptions): [CuserPublisher](classes/cuserpublisher.md)

*Defined in publisher/publisher.js:86*

#### Parameters:

Name | Type |
------ | ------ |
`core` | CuserCore |
`opts` | CuserStoreOptions |

**Returns:** [CuserPublisher](classes/cuserpublisher.md)

___

### isDagLink

▸ `Const`**isDagLink**(`state`: any): boolean

*Defined in publisher/publisher.js:18*

#### Parameters:

Name | Type |
------ | ------ |
`state` | any |

**Returns:** boolean
