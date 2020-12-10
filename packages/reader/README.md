<p align="center">
  <a href="./"><img width="250" src="https://raw.githubusercontent.com/rubeniskov/cuser/master/docs/logo.svg" alt="cuser logo" /></a>
</p>

## Status
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=reader)](https://codecov.io/gh/rubeniskov/cuser)
[![npm](https://img.shields.io/npm/v/@cuser/reader.svg)](https://www.npmjs.com/package/@cuser/reader)
[![npm-downloads](https://img.shields.io/npm/dw/@cuser/reader)](https://www.npmjs.com/package/@cuser/reader)


# Class: CuserReader

## Hierarchy

* **CuserReader**

## Index

### Constructors

* [constructor](cuserreader.md#constructor)

### Methods

* [\_resolveRootMessage](cuserreader.md#_resolverootmessage)
* [getMessage](cuserreader.md#getmessage)
* [getMessages](cuserreader.md#getmessages)

## Constructors

### constructor

\+ **new CuserReader**(`core`: CuserCore, `peerId`: string \| Promise<string\>, `opts?`: CuserReaderOptions): [CuserReader](cuserreader.md)

*Defined in [reader/reader.js:32](https://github.com/rubeniskov/cuser/blob/c27bb68/packages/reader/reader.js#L32)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`core` | CuserCore | - |
`peerId` | string \| Promise<string\> | - |
`opts` | CuserReaderOptions | {} |

**Returns:** [CuserReader](cuserreader.md)

## Methods

### \_resolveRootMessage

▸ `Private`**_resolveRootMessage**(`topicId`: string): Promise<string\>

*Defined in [reader/reader.js:118](https://github.com/rubeniskov/cuser/blob/c27bb68/packages/reader/reader.js#L118)*

Get the root message for a certain topicId

#### Parameters:

Name | Type |
------ | ------ |
`topicId` | string |

**Returns:** Promise<string\>

___

### getMessage

▸ **getMessage**(`cid`: string): Promise<GraphMessage\>

*Defined in [reader/reader.js:108](https://github.com/rubeniskov/cuser/blob/c27bb68/packages/reader/reader.js#L108)*

Gets the message from ipfs using the CID given by parameter

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |

**Returns:** Promise<GraphMessage\>

___

### getMessages

▸ **getMessages**(`topicId`: string, `opts`: CuserReaderMessagesIteratorOptions): Promise<CuserReaderMessageIteratorResult[]\> \| AsyncIterable<CuserReaderMessageIteratorResult\>

*Defined in [reader/reader.js:76](https://github.com/rubeniskov/cuser/blob/c27bb68/packages/reader/reader.js#L76)*

Gets messages from `ipfs` layer

**`example`** 
### Array
```javascript
const messages = reader.getMessages('custom_topic_id');
console.log(messages);
```
### Iterator
```javascript
const messages = reader.getMessages('custom_topic_id', {
  iterator: true,
});
for await (let value of messages) {
  console.log(value);
}
```

#### Parameters:

Name | Type |
------ | ------ |
`topicId` | string |
`opts` | CuserReaderMessagesIteratorOptions |

**Returns:** Promise<CuserReaderMessageIteratorResult[]\> \| AsyncIterable<CuserReaderMessageIteratorResult\>
