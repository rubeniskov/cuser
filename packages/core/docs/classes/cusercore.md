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

*Defined in core.js:21*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node` | IPFSAPI |  |
`opts` | CuserCoreOptions |   |

**Returns:** [CuserCore](cusercore.md)

## Methods

### get

▸ **get**(`cid`: string, `opts`: AbortOptions): Promise\<any>

*Defined in core.js:78*

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |
`opts` | AbortOptions |

**Returns:** Promise\<any>

___

### publish

▸ **publish**(`cid`: string, `opts`: AbortOptions): Promise\<PublishResult>

*Defined in core.js:47*

Publish using ipns to link the current cid to a fixed entry

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |
`opts` | AbortOptions |

**Returns:** Promise\<PublishResult>

___

### put

▸ **put**(`buf`: Uint8Array, `opts`: AbortOptions): Promise\<CID>

*Defined in core.js:64*

#### Parameters:

Name | Type |
------ | ------ |
`buf` | Uint8Array |
`opts` | AbortOptions |

**Returns:** Promise\<CID>

___

### resolve

▸ **resolve**(`cid`: string): Promise\<string>

*Defined in core.js:91*

Resolve the linked dag cid

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |

**Returns:** Promise\<string>
