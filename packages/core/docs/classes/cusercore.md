# Class: CuserCore

Core logic to manage the dag tree and specify the dag format, this will wraps
ipfs.dag in order to normalize the mainly used methods and allows future replacements.

## Hierarchy

* **CuserCore**

## Index

### Constructors

* [constructor](docs/classes/cusercore.md#constructor)

### Methods

* [get](docs/classes/cusercore.md#get)
* [peerId](docs/classes/cusercore.md#peerid)
* [publish](docs/classes/cusercore.md#publish)
* [pubsub](docs/classes/cusercore.md#pubsub)
* [put](docs/classes/cusercore.md#put)
* [resolve](docs/classes/cusercore.md#resolve)

## Constructors

### constructor

\+ **new CuserCore**(`node`: IPFSAPI \| Promise<IPFSAPI\>, `opts`: CuserCoreOptions): [CuserCore](docs/classes/cusercore.md)

*Defined in [core.js:28](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/core.js#L28)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise<IPFSAPI\> |
`opts` | CuserCoreOptions |

**Returns:** [CuserCore](docs/classes/cusercore.md)

## Methods

### get

▸ **get**(`cid`: string, `opts`: AbortOptions): Promise<any\>

*Defined in [core.js:91](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/core.js#L91)*

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |
`opts` | AbortOptions |

**Returns:** Promise<any\>

___

### peerId

▸ **peerId**(): Promise<string\>

*Defined in [core.js:119](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/core.js#L119)*

Gets the node peerId

**Returns:** Promise<string\>

___

### publish

▸ **publish**(`cid`: string, `opts`: AbortOptions): Promise<PublishResult\>

*Defined in [core.js:56](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/core.js#L56)*

Publish using ipns to link the current cid to a fixed entry

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |
`opts` | AbortOptions |

**Returns:** Promise<PublishResult\>

___

### pubsub

▸ **pubsub**(`opts`: CuserClientPubSubOptions): [ClientCorePubSub](docs/classes/clientcorepubsub.md)

*Defined in [core.js:128](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/core.js#L128)*

#### Parameters:

Name | Type |
------ | ------ |
`opts` | CuserClientPubSubOptions |

**Returns:** [ClientCorePubSub](docs/classes/clientcorepubsub.md)

___

### put

▸ **put**(`value`: any, `opts`: AbortOptions & PutOptions): Promise<string\>

*Defined in [core.js:75](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/core.js#L75)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |
`opts` | AbortOptions & PutOptions |

**Returns:** Promise<string\>

___

### resolve

▸ **resolve**(`cid`: string \| Promise<string\>): Promise<string\>

*Defined in [core.js:106](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/core.js#L106)*

Resolve the linked dag cid

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string \| Promise<string\> |

**Returns:** Promise<string\>
