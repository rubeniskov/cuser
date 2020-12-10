# @cuser/proto

## Index

### Classes

* [CuserReader](classes/cuserreader.md)

### Variables

* [itAll](globals.md#itall)

### Functions

* [createMessageIteratee](globals.md#createmessageiteratee)
* [createMessageMapper](globals.md#createmessagemapper)
* [createReader](globals.md#createreader)
* [messageIterator](globals.md#messageiterator)

## Variables

### itAll

• `Const` **itAll**: all = require('it-all')

*Defined in [reader/reader.js:3](https://github.com/rubeniskov/cuser/blob/c27bb68/packages/reader/reader.js#L3)*

## Functions

### createMessageIteratee

▸ `Const`**createMessageIteratee**(`resolve`: (cursor: any) => Promise<any\>, `root`: any, `opts`: CuserMessageIteratorOptions): function

*Defined in [reader/messageIterator.js:16](https://github.com/rubeniskov/cuser/blob/c27bb68/packages/reader/messageIterator.js#L16)*

#### Parameters:

Name | Type |
------ | ------ |
`resolve` | (cursor: any) => Promise<any\> |
`root` | any |
`opts` | CuserMessageIteratorOptions |

**Returns:** function

___

### createMessageMapper

▸ `Const`**createMessageMapper**(`resolve`: (hash: String) => Promise<Object\>): function

*Defined in [reader/mapper.js:8](https://github.com/rubeniskov/cuser/blob/c27bb68/packages/reader/mapper.js#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`resolve` | (hash: String) => Promise<Object\> |

**Returns:** function

___

### createReader

▸ `Const`**createReader**(`core`: CuserCore, `peerId`: string \| Promise<string\>, `opts`: CuserReaderOptions): [CuserReader](classes/cuserreader.md)

*Defined in [reader/reader.js:156](https://github.com/rubeniskov/cuser/blob/c27bb68/packages/reader/reader.js#L156)*

#### Parameters:

Name | Type |
------ | ------ |
`core` | CuserCore |
`peerId` | string \| Promise<string\> |
`opts` | CuserReaderOptions |

**Returns:** [CuserReader](classes/cuserreader.md)

___

### messageIterator

▸ `Const`**messageIterator**(`resolve`: (cursor: any) => Promise<any\>, `root`: any, `opts`: CuserMessageIteratorOptions): AsyncIterable<any\>

*Defined in [reader/messageIterator.js:66](https://github.com/rubeniskov/cuser/blob/c27bb68/packages/reader/messageIterator.js#L66)*

Create message iterator which traverse resolving root and itertating by the key define by options

#### Parameters:

Name | Type |
------ | ------ |
`resolve` | (cursor: any) => Promise<any\> |
`root` | any |
`opts` | CuserMessageIteratorOptions |

**Returns:** AsyncIterable<any\>
