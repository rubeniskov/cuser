# Class: CuserReader

## Hierarchy

* **CuserReader**

## Index

### Constructors

* [constructor](cuserreader.md#constructor)

### Methods

* [getMessage](cuserreader.md#getmessage)
* [getMessages](cuserreader.md#getmessages)

## Constructors

### constructor

\+ **new CuserReader**(`node`: IPFSAPI \| Promise\<IPFSAPI>, `peerId`: string, `opts`: any): [CuserReader](cuserreader.md)

*Defined in reader/reader.js:33*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise\<IPFSAPI> |
`peerId` | string |
`opts` | any |

**Returns:** [CuserReader](cuserreader.md)

## Methods

### getMessage

▸ **getMessage**(`cid`: string): Promise\<GraphMessage>

*Defined in reader/reader.js:117*

Gets the message from ipfs using the CID given by parameter

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |

**Returns:** Promise\<GraphMessage>

___

### getMessages

▸ **getMessages**(`topicId`: string, `opts`: CuserReaderMessagesIteratorOptions): Promise\<CuserReaderMessageIteratorResult[]>

*Defined in reader/reader.js:74*

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

**Returns:** Promise\<CuserReaderMessageIteratorResult[]>
