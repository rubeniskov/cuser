<p align="center">
  <a href="./"><img width="250" src="https://raw.githubusercontent.com/rubeniskov/cuser/master/docs/logo.svg" alt="cuser logo" /></a>
</p>

# @cuser/client

## Status
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=client)](https://codecov.io/gh/rubeniskov/cuser)
[![npm](https://img.shields.io/npm/v/@cuser/client.svg)](https://www.npmjs.com/package/@cuser/client)
[![npm-downloads](https://img.shields.io/npm/dw/@cuser/client)](https://www.npmjs.com/package/@cuser/client)


# Class: CuserClient

Cuser client instance which provides an interface to read, publish,
edit and delete messages through ipfs. By default the client will be only
allowed to read messages unless you provide a `CuserServer` `url`,
which will enable the publishing capabilities to the users.
> Note
To enable publisher capabilities, you need deploy a `CuserServer`,
please refer to [getting started](https://github.com/rubeniskov/cuser#getting-started) section to gets more information.

**`example`** 

```javascript
const { create } = require('ipfs');

const node = create({ ...ipfsOptions });
const cuserId = 'CUSER_SERVER_IDENTIFIER';
const client = new CuserClient(node, cuserId);
const topicId = 'custom-topic-id';

client.getMessages(topicId).then((messages) => {
 console.log(messages);
 // should return empty array when no comments
});
```

## Hierarchy

* [CuserReader](../globals.md#cuserreader)

  ↳ **CuserClient**

## Index

### Constructors

* [constructor](cuserclient.md#constructor)

### Properties

* [\_core](cuserclient.md#_core)
* [\_process](cuserclient.md#_process)

### Methods

* [authenticate](cuserclient.md#authenticate)
* [deleteMessage](cuserclient.md#deletemessage)
* [getMessage](cuserclient.md#getmessage)
* [getMessages](cuserclient.md#getmessages)
* [publishMessage](cuserclient.md#publishmessage)
* [subscribe](cuserclient.md#subscribe)
* [updateMessage](cuserclient.md#updatemessage)

## Constructors

### constructor

\+ **new CuserClient**(`node`: IPFSAPI \| Promise<IPFSAPI\>, `cuserId`: string, `opts?`: CuserClientOptions & CuserReaderOptions & CuserCoreOptions): [CuserClient](cuserclient.md)

*Overrides void*

*Defined in [client/client.js:53](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/client/client.js#L53)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`node` | IPFSAPI \| Promise<IPFSAPI\> | - |
`cuserId` | string | - |
`opts` | CuserClientOptions & CuserReaderOptions & CuserCoreOptions | {} |

**Returns:** [CuserClient](cuserclient.md)

## Properties

### \_core

•  **\_core**: CuserCore

*Inherited from [CuserClient](cuserclient.md).[_core](cuserclient.md#_core)*

*Defined in [reader/reader.d.ts:44](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/reader/reader.d.ts#L44)*

___

### \_process

•  **\_process**: (message: any, cursor: string) => Promise<CuserReaderMessageIteratorResult\>

*Inherited from [CuserClient](cuserclient.md).[_process](cuserclient.md#_process)*

*Defined in [reader/reader.d.ts:48](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/reader/reader.d.ts#L48)*

## Methods

### authenticate

▸ **authenticate**(`username`: string, `avatar`: string): Promise<any\>

*Defined in [client/client.js:80](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/client/client.js#L80)*

Authenticates a user with the required fields of username and avatar,
this will epect to recieve an access_token to be used in publishing operations

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`username` | string |  |
`avatar` | string | data url scheme https://tools.ietf.org/html/rfc2397  |

**Returns:** Promise<any\>

___

### deleteMessage

▸ **deleteMessage**(`topicId`: string, `accessToken`: string, `messageId`: string): Promise<[any, Response]\>

*Defined in [client/client.js:142](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/client/client.js#L142)*

Deletes message for certain topic using topicId as identifier
and accessToken to identify the user

#### Parameters:

Name | Type |
------ | ------ |
`topicId` | string |
`accessToken` | string |
`messageId` | string |

**Returns:** Promise<[any, Response]\>

___

### getMessage

▸ **getMessage**(`cid`: string): Promise<GraphMessage\>

*Inherited from [CuserClient](cuserclient.md).[getMessage](cuserclient.md#getmessage)*

*Defined in [reader/reader.d.ts:76](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/reader/reader.d.ts#L76)*

Gets the message from ipfs using the CID given by parameter

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |

**Returns:** Promise<GraphMessage\>

___

### getMessages

▸ **getMessages**(`topicId`: string, `opts`: CuserReaderMessagesIteratorOptions): Promise<CuserReaderMessageIteratorResult[]\> \| AsyncIterable<CuserReaderMessageIteratorResult\>

*Inherited from [CuserClient](cuserclient.md).[getMessages](cuserclient.md#getmessages)*

*Defined in [reader/reader.d.ts:70](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/reader/reader.d.ts#L70)*

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

___

### publishMessage

▸ **publishMessage**(`topicId`: string, `accessToken`: string, `content`: string): Promise<[any, Response]\>

*Defined in [client/client.js:97](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/client/client.js#L97)*

Publish a new message for certain topic using topicId as identifier
and accessToken to identify the user

#### Parameters:

Name | Type |
------ | ------ |
`topicId` | string |
`accessToken` | string |
`content` | string |

**Returns:** Promise<[any, Response]\>

___

### subscribe

▸ **subscribe**(`topicId`: string, `subscriber`: CuserClientSubscriber): function

*Defined in [client/client.js:184](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/client/client.js#L184)*

Subscribe to message changes of a certain topic.

**`example`** 
This will attach the listener to three types of events:
- `created` when a user publish a message
- `updated` when a user updates a message
- `deleted` when a user removes a message
```javascript
client.subscribe('CUSTOM_TOPIC_ID', ({ type, messageCid }) => {
 switch(type) {
   case 'created':
     // when a user publish a message
     // console.log(client.getMessage(messageCid));
     break;
   case 'updated':
     // when a user updates a message
     // console.log(client.getMessage(messageCid));
     break;
   case 'deleted':
     // when a user removes a message
     // console.log(client.getMessage(messageCid));
     break;
 }
});
```

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`topicId` | string | topic identifier |
`subscriber` | CuserClientSubscriber | function event subscriber  |

**Returns:** function

___

### updateMessage

▸ **updateMessage**(`topicId`: string, `accessToken`: string, `messageId`: string, `content`: string): Promise<[any, Response]\>

*Defined in [client/client.js:120](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/client/client.js#L120)*

Updates message for certain topic using topicId as identifier
and accessToken to identify the user

#### Parameters:

Name | Type |
------ | ------ |
`topicId` | string |
`accessToken` | string |
`messageId` | string |
`content` | string |

**Returns:** Promise<[any, Response]\>
