# @cuser/proto

## Index

### Classes

* [CuserClient](classes/cuserclient.md)

### Variables

* [Room](globals.md#room)
* [createCore](globals.md#createcore)
* [createMessageIterator](globals.md#createmessageiterator)
* [fetch](globals.md#fetch)
* [toArray](globals.md#toarray)

### Functions

* [createClient](globals.md#createclient)
* [createPubSub](globals.md#createpubsub)
* [createRoomFromEventEmiter](globals.md#createroomfromeventemiter)
* [fetcher](globals.md#fetcher)
* [noPublisher](globals.md#nopublisher)
* [parseUrl](globals.md#parseurl)

## Variables

### Room

• `Const` **Room**: any = require('ipfs-pubsub-room')

*Defined in [client/pubsub.js:3](https://github.com/rubeniskov/cuser/blob/07db02c/packages/client/pubsub.js#L3)*

___

### createCore

• `Const` **createCore**: any = require('@cuser/core')

*Defined in [client/client.js:4](https://github.com/rubeniskov/cuser/blob/07db02c/packages/client/client.js#L4)*

___

### createMessageIterator

• `Const` **createMessageIterator**: messageIterator = require('./messageIterator')

*Defined in [client/client.js:8](https://github.com/rubeniskov/cuser/blob/07db02c/packages/client/client.js#L8)*

___

### fetch

• `Const` **fetch**: [fetcher](globals.md#fetcher) = require('./fetch')

*Defined in [client/fetch.js:3](https://github.com/rubeniskov/cuser/blob/07db02c/packages/client/fetch.js#L3)*

*Defined in [client/client.js:6](https://github.com/rubeniskov/cuser/blob/07db02c/packages/client/client.js#L6)*

___

### toArray

• `Const` **toArray**: any = require('async-iterator-to-array')

*Defined in [client/client.js:5](https://github.com/rubeniskov/cuser/blob/07db02c/packages/client/client.js#L5)*

## Functions

### createClient

▸ `Const`**createClient**(`node`: IPFSAPI, `cuserId`: string, `opts`: CuserClientOptions): [CuserClient](classes/cuserclient.md)

*Defined in [client/client.js:276](https://github.com/rubeniskov/cuser/blob/07db02c/packages/client/client.js#L276)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI |
`cuserId` | string |
`opts` | CuserClientOptions |

**Returns:** [CuserClient](classes/cuserclient.md)

___

### createPubSub

▸ `Const`**createPubSub**(`node`: IPFSAPI, `opts`: CuserClientPubSubOptions): object

*Defined in [client/pubsub.js:41](https://github.com/rubeniskov/cuser/blob/07db02c/packages/client/pubsub.js#L41)*

Creates pubsub cuser to listen changes on cuser network

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI |
`opts` | CuserClientPubSubOptions |

**Returns:** object

Name | Type |
------ | ------ |
`broadcast` | (topicId: string, payload: any) => void |
`subscribe` | (topicId: any, subscriber: any) => (Anonymous function) |

___

### createRoomFromEventEmiter

▸ `Const`**createRoomFromEventEmiter**(`node`: IPFSAPI): object

*Defined in [client/pubsub.js:18](https://github.com/rubeniskov/cuser/blob/07db02c/packages/client/pubsub.js#L18)*

Creates a room using EventEmiter

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node` | IPFSAPI |   |

**Returns:** object

Name | Type |
------ | ------ |
`off` | any |
`on` | any |
`broadcast` | (data: any) => void |

___

### fetcher

▸ `Const`**fetcher**(`url`: string, `opts`: any): Promise\<any>

*Defined in [client/fetch.js:21](https://github.com/rubeniskov/cuser/blob/07db02c/packages/client/fetch.js#L21)*

Fetcher interface

#### Parameters:

Name | Type |
------ | ------ |
`url` | string |
`opts` | any |

**Returns:** Promise\<any>

___

### noPublisher

▸ `Const`**noPublisher**(): never

*Defined in [client/utils.js:17](https://github.com/rubeniskov/cuser/blob/07db02c/packages/client/utils.js#L17)*

No publisher function

**Returns:** never

___

### parseUrl

▸ `Const`**parseUrl**(`url`: string): string

*Defined in [client/utils.js:7](https://github.com/rubeniskov/cuser/blob/07db02c/packages/client/utils.js#L7)*

if url guess url from global.location

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | string |   |

**Returns:** string
