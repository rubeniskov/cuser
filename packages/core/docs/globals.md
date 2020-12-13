# @cuser/core

## Index

### Classes

* [ClientCorePubSub](docs/classes/clientcorepubsub.md)
* [CuserCore](docs/classes/cusercore.md)

### Variables

* [CID](docs/globals.md#cid)
* [Room](docs/globals.md#room)
* [debug](docs/globals.md#debug)
* [itAll](docs/globals.md#itall)

### Functions

* [createCore](docs/globals.md#createcore)
* [createPubSub](docs/globals.md#createpubsub)
* [createRoomFromEventEmiter](docs/globals.md#createroomfromeventemiter)
* [createRoomFromIpfs](docs/globals.md#createroomfromipfs)
* [randomSeqno](docs/globals.md#randomseqno)

## Variables

### CID

• `Const` **CID**: [CID](docs/globals.md#cid) = require("cids")

*Defined in [core.js:9](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/core.js#L9)*

___

### Room

• `Const` **Room**: any = require('ipfs-pubsub-room')

*Defined in [pubsub.js:3](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/pubsub.js#L3)*

___

### debug

• `Const` **debug**: Debugger = require("debug")('cuser:core')

*Defined in [core.js:11](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/core.js#L11)*

___

### itAll

• `Const` **itAll**: all = require("it-all")

*Defined in [core.js:8](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/core.js#L8)*

## Functions

### createCore

▸ `Const`**createCore**(`node`: IPFSAPI \| Promise<IPFSAPI\>, `opts`: CuserCoreOptions): [CuserCore](docs/classes/cusercore.md)

*Defined in [core.js:137](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/core.js#L137)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise<IPFSAPI\> |
`opts` | CuserCoreOptions |

**Returns:** [CuserCore](docs/classes/cusercore.md)

___

### createPubSub

▸ `Const`**createPubSub**(`node`: IPFSAPI \| Promise<IPFSAPI\>, `opts`: CuserClientPubSubOptions): [ClientCorePubSub](docs/classes/clientcorepubsub.md)

*Defined in [pubsub.js:125](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/pubsub.js#L125)*

Creates pubsub to listen changes on cuser network

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise<IPFSAPI\> |
`opts` | CuserClientPubSubOptions |

**Returns:** [ClientCorePubSub](docs/classes/clientcorepubsub.md)

___

### createRoomFromEventEmiter

▸ `Const`**createRoomFromEventEmiter**(`node`: IPFSAPI, `channel`: string): object

*Defined in [pubsub.js:21](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/pubsub.js#L21)*

Creates a room using EventEmiter

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node` | IPFSAPI |  |
`channel` | string |   |

**Returns:** object

Name | Type |
------ | ------ |
`broadcast` | (data: any) => void |
`subscribe` | (listener: any) => (Anonymous function) |

___

### createRoomFromIpfs

▸ `Const`**createRoomFromIpfs**(`node`: IPFSAPI, `channel`: string): object

*Defined in [pubsub.js:52](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/pubsub.js#L52)*

Creates a room using IPFS

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node` | IPFSAPI |  |
`channel` | string |   |

**Returns:** object

Name | Type |
------ | ------ |
`broadcast` | (data: any) => void |
`subscribe` | (listener: any) => (Anonymous function) |

___

### randomSeqno

▸ `Const`**randomSeqno**(`bytes`: any): Buffer

*Defined in [pubsub.js:14](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/pubsub.js#L14)*

**`prop`** {(data: Object) => Buffer} [encode=cbor.encode] Encoder function to serialize event object

**`prop`** {(buf: Buffer) => Object} [decode=cbor.decodeFirstSync] Decoder function to unserialize event object

**`prop`** {String|Promise<String>} [channel='@cuser']

#### Parameters:

Name | Type |
------ | ------ |
`bytes` | any |

**Returns:** Buffer
