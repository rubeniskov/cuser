# Class: CuserClient

Cuser client instance which provides an interface to read, publish,
edit and delete messages through ipfs. By default the client will be only
allowed to read messages unless you provide a `CuserServer` `url`,
which will enable the publishing capabilities to the users.
> Note
To enable publisher capabilities, you need deploy a `CuserServer`,
please refer to [getting started](https://github.com/rubeniskov/cuser#getting-started) section to gets more information.
test

**`example`** 

```javascript
const { create } = require('ipfs');

const node = create({ ...ipfsOptions });
const targetCid = 'CUSER_SERVER_IDENTIFIER';
const client = new CuserClient(node, targetCid);
const topicId = 'custom-topic-id';

client.getMessages(topicId).then((messages) => {
 console.log(messages);
 // should return empty array when no comments
});
```

## Hierarchy

* any

  ↳ **CuserClient**

## Index

### Constructors

* [constructor](cuserclient.md#constructor)

### Methods

* [authenticate](cuserclient.md#authenticate)
* [getMessage](cuserclient.md#getmessage)
* [subscribe](cuserclient.md#subscribe)

## Constructors

### constructor

\+ **new CuserClient**(`node`: IPFSAPI, `cuserId`: string, `opts?`: CuserClientOptions): [CuserClient](cuserclient.md)

*Defined in [client.js:50](https://github.com/rubeniskov/cuser/blob/3395c13/packages/client/client.js#L50)*

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`node` | IPFSAPI | - |  |
`cuserId` | string | - |  |
`opts` | CuserClientOptions | {} |   |

**Returns:** [CuserClient](cuserclient.md)

## Methods

### authenticate

▸ **authenticate**(`username`: string, `avatar`: string): Promise\<any>

*Defined in [client.js:117](https://github.com/rubeniskov/cuser/blob/3395c13/packages/client/client.js#L117)*

Authenticates a user with the required fields of username and avatar,
this will epect to recieve an access_token to be used in publishing operations

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`username` | string |  |
`avatar` | string | data rul scheme https://tools.ietf.org/html/rfc2397  |

**Returns:** Promise\<any>

___

### getMessage

▸ **getMessage**(`cid`: CID): Promise\<AsyncIterable\<File \| Directory>>

*Defined in [client.js:107](https://github.com/rubeniskov/cuser/blob/3395c13/packages/client/client.js#L107)*

Gets the message from the CID given by parameter

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`cid` | CID |   |

**Returns:** Promise\<AsyncIterable\<File \| Directory>>

___

### subscribe

▸ **subscribe**(`topicId`: string, `subscriber`: CuserClientSubscriber): (Anonymous function)

*Defined in [client.js:184](https://github.com/rubeniskov/cuser/blob/3395c13/packages/client/client.js#L184)*

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
