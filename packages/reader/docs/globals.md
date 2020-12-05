# @cuser/reader

## Index

### Classes

* [CuserReader](classes/cuserreader.md)

### Variables

* [createCore](globals.md#createcore)
* [createMessageIterator](globals.md#createmessageiterator)
* [toArray](globals.md#toarray)

### Functions

* [createReader](globals.md#createreader)

## Variables

### createCore

• `Const` **createCore**: any = require('@cuser/core')

*Defined in reader/reader.js:7*

___

### createMessageIterator

• `Const` **createMessageIterator**: messageIterator = require('./messageIterator')

*Defined in reader/reader.js:8*

___

### toArray

• `Const` **toArray**: any = require('async-iterator-to-array')

*Defined in reader/reader.js:6*

## Functions

### createReader

▸ `Const`**createReader**(`node`: IPFSAPI \| Promise\<IPFSAPI>, `peerId`: string, `opts`: any): [CuserReader](classes/cuserreader.md)

*Defined in reader/reader.js:127*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise\<IPFSAPI> |
`peerId` | string |
`opts` | any |

**Returns:** [CuserReader](classes/cuserreader.md)
