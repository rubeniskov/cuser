# @cuser/core

## Index

### Classes

* [ClientCorePubSub](docs/classes/clientcorepubsub.md)
* [CuserCore](docs/classes/cusercore.md)

### Variables

* [CID](docs/globals.md#cid)
* [Room](docs/globals.md#room)
* [all](docs/globals.md#all)
* [debug](docs/globals.md#debug)

### Functions

* [createCore](docs/globals.md#createcore)
* [createPubSub](docs/globals.md#createpubsub)
* [createRoomFromEventEmiter](docs/globals.md#createroomfromeventemiter)
* [randomSeqno](docs/globals.md#randomseqno)

## Variables

### CID

• `Const` **CID**: [CID](docs/globals.md#cid) = require("cids")

*Defined in [core.js:9](https://github.com/rubeniskov/cuser/blob/d94f1e7/packages/core/core.js#L9)*

___

### Room

• `Const` **Room**: any = require('ipfs-pubsub-room')

*Defined in [pubsub.js:3](https://github.com/rubeniskov/cuser/blob/d94f1e7/packages/core/pubsub.js#L3)*

___

### all

• `Const` **all**: [all](docs/globals.md#all) = require("it-all")

*Defined in [core.js:8](https://github.com/rubeniskov/cuser/blob/d94f1e7/packages/core/core.js#L8)*

___

### debug

• `Const` **debug**: Debugger = require("debug")('cuser:core')

*Defined in [core.js:11](https://github.com/rubeniskov/cuser/blob/d94f1e7/packages/core/core.js#L11)*

## Functions

### createCore

▸ `Const`**createCore**(`node`: IPFSAPI, `opts`: CuserCoreOptions): [CuserCore](docs/classes/cusercore.md)

*Defined in [core.js:135](https://github.com/rubeniskov/cuser/blob/d94f1e7/packages/core/core.js#L135)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI |
`opts` | CuserCoreOptions |

**Returns:** [CuserCore](docs/classes/cusercore.md)

___

### createPubSub

▸ `Const`**createPubSub**(`node`: IPFSAPI \| Promise\<IPFSAPI>, `opts`: CuserClientPubSubOptions): [ClientCorePubSub](docs/classes/clientcorepubsub.md)

*Defined in [pubsub.js:92](https://github.com/rubeniskov/cuser/blob/d94f1e7/packages/core/pubsub.js#L92)*

Creates pubsub to listen changes on cuser network

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise\<IPFSAPI> |
`opts` | CuserClientPubSubOptions |

**Returns:** [ClientCorePubSub](docs/classes/clientcorepubsub.md)

___

### createRoomFromEventEmiter

▸ `Const`**createRoomFromEventEmiter**(`node`: any, `channel`: any): object

*Defined in [pubsub.js:18](https://github.com/rubeniskov/cuser/blob/d94f1e7/packages/core/pubsub.js#L18)*

Creates a room using EventEmiter

#### Parameters:

Name | Type |
------ | ------ |
`node` | any |
`channel` | any |

**Returns:** object

Name | Type |
------ | ------ |
`off` | any |
`on` | any |
`broadcast` | (data: any) => void |

___

### randomSeqno

▸ `Const`**randomSeqno**(`bytes`: any): Buffer

*Defined in [pubsub.js:14](https://github.com/rubeniskov/cuser/blob/d94f1e7/packages/core/pubsub.js#L14)*

**`prop`** {(data: Object) => Buffer} [encode=cbor.encode] Encoder function to serialize event object

**`prop`** {(buf: Buffer) => Object} [decode=cbor.decodeFirstSync] Decoder function to unserialize event object

**`prop`** {String} [channel='@cuser']

#### Parameters:

Name | Type |
------ | ------ |
`bytes` | any |

**Returns:** Buffer
