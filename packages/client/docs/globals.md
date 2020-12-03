# @cuser/proto

## Index

### Classes

* [CuserClient](classes/cuserclient.md)

### Variables

* [CID](globals.md#cid)
* [Room](globals.md#room)
* [fetch](globals.md#fetch)
* [messageIterator](globals.md#messageiterator)
* [toArray](globals.md#toarray)

### Functions

* [createClient](globals.md#createclient)
* [createPubSub](globals.md#createpubsub)
* [createRoomFromEventEmiter](globals.md#createroomfromeventemiter)
* [fetcher](globals.md#fetcher)
* [noPublisher](globals.md#nopublisher)
* [parseUrl](globals.md#parseurl)

## Variables

### CID

• `Const` **CID**: [CID](globals.md#cid) = require('ipfs-core').CID

*Defined in [client/client.js:7](https://github.com/rubeniskov/cuser/blob/2609725/packages/client/client.js#L7)*

___

### Room

• `Const` **Room**: any = require('ipfs-pubsub-room')

*Defined in [client/pubsub.js:3](https://github.com/rubeniskov/cuser/blob/2609725/packages/client/pubsub.js#L3)*

___

### fetch

• `Const` **fetch**: [fetcher](globals.md#fetcher) = require('./fetch')

*Defined in [client/fetch.js:3](https://github.com/rubeniskov/cuser/blob/2609725/packages/client/fetch.js#L3)*

*Defined in [client/client.js:5](https://github.com/rubeniskov/cuser/blob/2609725/packages/client/client.js#L5)*

___

### messageIterator

• `Const` **messageIterator**: [messageIterator](globals.md#messageiterator) = require('./messageIterator')

*Defined in [client/client.js:8](https://github.com/rubeniskov/cuser/blob/2609725/packages/client/client.js#L8)*

___

### toArray

• `Const` **toArray**: any = require('async-iterator-to-array')

*Defined in [client/client.js:9](https://github.com/rubeniskov/cuser/blob/2609725/packages/client/client.js#L9)*

## Functions

### createClient

▸ `Const`**createClient**(`node`: any, `cuserId`: any, `opts`: any): [CuserClient](classes/cuserclient.md)

*Defined in [client/client.js:252](https://github.com/rubeniskov/cuser/blob/2609725/packages/client/client.js#L252)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | any |
`cuserId` | any |
`opts` | any |

**Returns:** [CuserClient](classes/cuserclient.md)

___

### createPubSub

▸ `Const`**createPubSub**(`node`: IPFSAPI, `opts`: CuserClientPubSubOptions): object

*Defined in [client/pubsub.js:41](https://github.com/rubeniskov/cuser/blob/2609725/packages/client/pubsub.js#L41)*

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

*Defined in [client/pubsub.js:18](https://github.com/rubeniskov/cuser/blob/2609725/packages/client/pubsub.js#L18)*

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

*Defined in [client/fetch.js:21](https://github.com/rubeniskov/cuser/blob/2609725/packages/client/fetch.js#L21)*

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

*Defined in [client/utils.js:17](https://github.com/rubeniskov/cuser/blob/2609725/packages/client/utils.js#L17)*

No publisher function

**Returns:** never

___

### parseUrl

▸ `Const`**parseUrl**(`url`: string): string

*Defined in [client/utils.js:7](https://github.com/rubeniskov/cuser/blob/2609725/packages/client/utils.js#L7)*

if url guess url from global.location

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | string |   |

**Returns:** string
