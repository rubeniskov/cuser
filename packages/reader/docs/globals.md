# @cuser/proto

## Index

### Classes

* [CuserReader](classes/cuserreader.md)

### Variables

* [createCore](globals.md#createcore)
* [createMessageIterator](globals.md#createmessageiterator)
* [itAll](globals.md#itall)

### Functions

* [createMessageIteratee](globals.md#createmessageiteratee)
* [createMessageMapper](globals.md#createmessagemapper)
* [createReader](globals.md#createreader)
* [messageIterator](globals.md#messageiterator)

## Variables

### createCore

• `Const` **createCore**: any = require('@cuser/core')

*Defined in [reader/reader.js:7](https://github.com/rubeniskov/cuser/blob/c3668c9/packages/reader/reader.js#L7)*

___

### createMessageIterator

• `Const` **createMessageIterator**: [messageIterator](globals.md#messageiterator) = require('./messageIterator')

*Defined in [reader/reader.js:8](https://github.com/rubeniskov/cuser/blob/c3668c9/packages/reader/reader.js#L8)*

___

### itAll

• `Const` **itAll**: all = require('it-all')

*Defined in [reader/reader.js:6](https://github.com/rubeniskov/cuser/blob/c3668c9/packages/reader/reader.js#L6)*

## Functions

### createMessageIteratee

▸ `Const`**createMessageIteratee**(`resolve`: (cursor: any) => Promise\<any>, `root`: any, `opts`: CuserMessageIteratorOptions): function

*Defined in [reader/messageIterator.js:16](https://github.com/rubeniskov/cuser/blob/c3668c9/packages/reader/messageIterator.js#L16)*

#### Parameters:

Name | Type |
------ | ------ |
`resolve` | (cursor: any) => Promise\<any> |
`root` | any |
`opts` | CuserMessageIteratorOptions |

**Returns:** function

___

### createMessageMapper

▸ `Const`**createMessageMapper**(`resolve`: (hash: String) => Promise\<Object>): function

*Defined in reader/mapper.js:8*

#### Parameters:

Name | Type |
------ | ------ |
`resolve` | (hash: String) => Promise\<Object> |

**Returns:** function

___

### createReader

▸ `Const`**createReader**(`node`: IPFSAPI \| Promise\<IPFSAPI>, `peerId`: string, `opts`: any): [CuserReader](classes/cuserreader.md)

*Defined in [reader/reader.js:154](https://github.com/rubeniskov/cuser/blob/c3668c9/packages/reader/reader.js#L154)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise\<IPFSAPI> |
`peerId` | string |
`opts` | any |

**Returns:** [CuserReader](classes/cuserreader.md)

___

### messageIterator

▸ `Const`**messageIterator**(`resolve`: (cursor: any) => Promise\<any>, `root`: any, `opts`: CuserMessageIteratorOptions): AsyncIterable\<any>

*Defined in [reader/messageIterator.js:66](https://github.com/rubeniskov/cuser/blob/c3668c9/packages/reader/messageIterator.js#L66)*

Create message iterator which traverse resolving root and itertating by the key define by options

#### Parameters:

Name | Type |
------ | ------ |
`resolve` | (cursor: any) => Promise\<any> |
`root` | any |
`opts` | CuserMessageIteratorOptions |

**Returns:** AsyncIterable\<any>
