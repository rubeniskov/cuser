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

* **CuserClient**

## Index

### Constructors

* [constructor](cuserclient.md#constructor)

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

\+ **new CuserClient**(`node`: IPFSAPI, `cuserId`: string, `opts?`: CuserClientOptions): [CuserClient](cuserclient.md)

*Defined in [client/client.js:59](https://github.com/rubeniskov/cuser/blob/2225de6/packages/client/client.js#L59)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`node` | IPFSAPI | - |
`cuserId` | string | - |
`opts` | CuserClientOptions | {} |

**Returns:** [CuserClient](cuserclient.md)

## Methods

### authenticate

▸ **authenticate**(`username`: string, `avatar`: string): Promise\<any>

*Defined in [client/client.js:152](https://github.com/rubeniskov/cuser/blob/2225de6/packages/client/client.js#L152)*

Authenticates a user with the required fields of username and avatar,
this will epect to recieve an access_token to be used in publishing operations

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`username` | string |  |
`avatar` | string | data url scheme https://tools.ietf.org/html/rfc2397  |

**Returns:** Promise\<any>

___

### deleteMessage

▸ **deleteMessage**(`topicId`: string, `accessToken`: string, `messageId`: string): Promise\<[any, Response]>

*Defined in [client/client.js:206](https://github.com/rubeniskov/cuser/blob/2225de6/packages/client/client.js#L206)*

Deletes message for certain topic using topicId as identifier
and accessToken to identify the user

#### Parameters:

Name | Type |
------ | ------ |
`topicId` | string |
`accessToken` | string |
`messageId` | string |

**Returns:** Promise\<[any, Response]>

___

### getMessage

▸ **getMessage**(`cid`: string): Promise\<GraphMessage>

*Defined in [client/client.js:142](https://github.com/rubeniskov/cuser/blob/2225de6/packages/client/client.js#L142)*

Gets the message from ipfs using the CID given by parameter

#### Parameters:

Name | Type |
------ | ------ |
`cid` | string |

**Returns:** Promise\<GraphMessage>

___

### getMessages

▸ **getMessages**(`topicId`: string, `opts`: CuserClientIteratorOptions): Promise\<GraphMessage[]> \| AsyncIterator\<GraphMessage, any, undefined>

*Defined in [client/client.js:110](https://github.com/rubeniskov/cuser/blob/2225de6/packages/client/client.js#L110)*

Gets messages from `ipfs` layer

**`example`** 
### Array
```javascript
const messages = client.getMessages('custom_topic_id');
console.log(messages);
```
### Iterator
```javascript
const messages = client.getMessages('custom_topic_id', {
  iter: true,
});
for await (let value of messages) {
  console.log(value);
}
```

#### Parameters:

Name | Type |
------ | ------ |
`topicId` | string |
`opts` | CuserClientIteratorOptions |

**Returns:** Promise\<GraphMessage[]> \| AsyncIterator\<GraphMessage, any, undefined>

___

### publishMessage

▸ **publishMessage**(`topicId`: string, `accessToken`: string, `content`: string): Promise\<[any, Response]>

*Defined in [client/client.js:169](https://github.com/rubeniskov/cuser/blob/2225de6/packages/client/client.js#L169)*

Publish a new message for certain topic using topicId as identifier
and accessToken to identify the user

#### Parameters:

Name | Type |
------ | ------ |
`topicId` | string |
`accessToken` | string |
`content` | string |

**Returns:** Promise\<[any, Response]>

___

### subscribe

▸ **subscribe**(`topicId`: string, `subscriber`: CuserClientSubscriber): (Anonymous function)

*Defined in [client/client.js:244](https://github.com/rubeniskov/cuser/blob/2225de6/packages/client/client.js#L244)*

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

**Returns:** (Anonymous function)

___

### updateMessage

▸ **updateMessage**(`topicId`: string, `accessToken`: string, `messageId`: string, `content`: string): Promise\<[any, Response]>

*Defined in [client/client.js:188](https://github.com/rubeniskov/cuser/blob/2225de6/packages/client/client.js#L188)*

Updates message for certain topic using topicId as identifier
and accessToken to identify the user

#### Parameters:

Name | Type |
------ | ------ |
`topicId` | string |
`accessToken` | string |
`messageId` | string |
`content` | string |

**Returns:** Promise\<[any, Response]>
