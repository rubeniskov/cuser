<p align="center">
  <a href="./"><img width="250" src="https://raw.githubusercontent.com/rubeniskov/cuser/master/docs/logo.svg" alt="cuser logo" /></a>
</p>

# @cuser/core

## Status
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=core)](https://codecov.io/gh/rubeniskov/cuser)
[![npm](https://img.shields.io/npm/v/@cuser/core.svg)](https://www.npmjs.com/package/@cuser/core)
[![npm-downloads](https://img.shields.io/npm/dw/@cuser/core)](https://www.npmjs.com/package/@cuser/core)
# Class: CuserCore

Core logic to manage the dag tree and specify the dag format, this will wraps
ipfs.dag in order to normalize the mainly used methods and allows future replacements.

## Hierarchy

* **CuserCore**

## Index

### Constructors

* [constructor](cusercore.md#constructor)

### Methods

* [get](cusercore.md#get)
* [publish](cusercore.md#publish)
* [put](cusercore.md#put)
* [resolve](cusercore.md#resolve)

## Constructors

### constructor

\+ **new CuserCore**(`node`: IPFSAPI, `opts`: CuserCoreOptions): [CuserCore](cusercore.md)

*Defined in [core.js:21](https://github.com/rubeniskov/cuser/blob/6809c33/packages/core/core.js#L21)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node` | IPFSAPI |  |
`opts` | CuserCoreOptions |   |

**Returns:** [CuserCore](cusercore.md)

## Methods

### get

▸ **get**(`cid`: string, `opts`: AbortOptions): Promise\<any>

*Defined in [core.js:80](https://github.com/rubeniskov/cuser/blob/6809c33/packages/core/core.js#L80)*

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |
`opts` | AbortOptions |

**Returns:** Promise\<any>

___

### publish

▸ **publish**(`cid`: string, `opts`: AbortOptions): Promise\<PublishResult>

*Defined in [core.js:47](https://github.com/rubeniskov/cuser/blob/6809c33/packages/core/core.js#L47)*

Publish using ipns to link the current cid to a fixed entry

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |
`opts` | AbortOptions |

**Returns:** Promise\<PublishResult>

___

### put

▸ **put**(`buf`: Uint8Array, `opts`: AbortOptions): Promise\<string>

*Defined in [core.js:65](https://github.com/rubeniskov/cuser/blob/6809c33/packages/core/core.js#L65)*

#### Parameters:

Name | Type |
------ | ------ |
`buf` | Uint8Array |
`opts` | AbortOptions |

**Returns:** Promise\<string>

___

### resolve

▸ **resolve**(`cid`: string): Promise\<string>

*Defined in [core.js:94](https://github.com/rubeniskov/cuser/blob/6809c33/packages/core/core.js#L94)*

Resolve the linked dag cid

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |

**Returns:** Promise\<string>
### References

- https://github.com/ipfs/js-ipfs#documentation
- https://github.com/libp2p/js-peer-id
- https://github.com/libp2p/js-libp2p
- https://github.com/libp2p/js-libp2p-crypto
- https://github.com/libp2p/js-libp2p-webrtc-star
- https://github.com/libp2p/js-libp2p-webrtc-star/blob/master/DEPLOYMENT.md
