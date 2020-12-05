<p align="center">
  <a href="./"><img width="250" src="https://raw.githubusercontent.com/rubeniskov/cuser/master/docs/logo.svg" alt="cuser logo" /></a>
</p>

# @cuser/core

## Status
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=core)](https://codecov.io/gh/rubeniskov/cuser)
[![npm](https://img.shields.io/npm/v/@cuser/core.svg)](https://www.npmjs.com/package/@cuser/core)
[![npm-downloads](https://img.shields.io/npm/dw/@cuser/core)](https://www.npmjs.com/package/@cuser/core)
# Class: ClientCorePubSub

Creates pubsub to listen changes on cuser network

## Hierarchy

* **ClientCorePubSub**

## Index

### Constructors

* [constructor](docs/classes/clientcorepubsub.md#constructor)

### Methods

* [broadcast](docs/classes/clientcorepubsub.md#broadcast)
* [subscribe](docs/classes/clientcorepubsub.md#subscribe)

## Constructors

### constructor

\+ **new ClientCorePubSub**(`node`: IPFSAPI \| Promise\<IPFSAPI>, `opts`: CuserClientPubSubOptions): [ClientCorePubSub](docs/classes/clientcorepubsub.md)

*Defined in pubsub.js:43*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise\<IPFSAPI> |
`opts` | CuserClientPubSubOptions |

**Returns:** [ClientCorePubSub](docs/classes/clientcorepubsub.md)

## Methods

### broadcast

▸ **broadcast**(`payload`: any): void

*Defined in pubsub.js:72*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`payload` | any |   |

**Returns:** void

___

### subscribe

▸ **subscribe**(`subscriber`: (payload: Object) => void): (Anonymous function)

*Defined in pubsub.js:78*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`subscriber` | (payload: Object) => void |   |

**Returns:** (Anonymous function)
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

\+ **new CuserCore**(`node`: IPFSAPI \| Promise\<IPFSAPI>, `opts`: CuserCoreOptions): [CuserCore](docs/classes/cusercore.md)

*Defined in [core.js:27](https://github.com/rubeniskov/cuser/blob/3388de0/packages/core/core.js#L27)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise\<IPFSAPI> |
`opts` | CuserCoreOptions |

**Returns:** [CuserCore](docs/classes/cusercore.md)

## Methods

### get

▸ **get**(`cid`: string, `opts`: AbortOptions): Promise\<any>

*Defined in [core.js:89](https://github.com/rubeniskov/cuser/blob/3388de0/packages/core/core.js#L89)*

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |
`opts` | AbortOptions |

**Returns:** Promise\<any>

___

### peerId

▸ **peerId**(): Promise\<string>

*Defined in [core.js:114](https://github.com/rubeniskov/cuser/blob/3388de0/packages/core/core.js#L114)*

Gets the node peerId

**Returns:** Promise\<string>

___

### publish

▸ **publish**(`cid`: string, `opts`: AbortOptions): Promise\<PublishResult>

*Defined in [core.js:54](https://github.com/rubeniskov/cuser/blob/3388de0/packages/core/core.js#L54)*

Publish using ipns to link the current cid to a fixed entry

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |
`opts` | AbortOptions |

**Returns:** Promise\<PublishResult>

___

### pubsub

▸ **pubsub**(`opts`: CuserClientPubSubOptions): [ClientCorePubSub](docs/classes/clientcorepubsub.md)

*Defined in [core.js:123](https://github.com/rubeniskov/cuser/blob/3388de0/packages/core/core.js#L123)*

#### Parameters:

Name | Type |
------ | ------ |
`opts` | CuserClientPubSubOptions |

**Returns:** [ClientCorePubSub](docs/classes/clientcorepubsub.md)

___

### put

▸ **put**(`value`: any, `opts`: AbortOptions & PutOptions): Promise\<string>

*Defined in [core.js:73](https://github.com/rubeniskov/cuser/blob/3388de0/packages/core/core.js#L73)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |
`opts` | AbortOptions & PutOptions |

**Returns:** Promise\<string>

___

### resolve

▸ **resolve**(`cid`: string): Promise\<string>

*Defined in [core.js:103](https://github.com/rubeniskov/cuser/blob/3388de0/packages/core/core.js#L103)*

Resolve the linked dag cid

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |

**Returns:** Promise\<string>
### References

- https://github.com/ipfs/js-ipfs#documentation
- https://github.com/ipfs/ipfs-docs/issues/242
