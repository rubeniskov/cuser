**[@cuser/client](../README.md)**

> [Globals](../globals.md) / CuserClient

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

* [subscribe](cuserclient.md#subscribe)

## Constructors

### constructor

\+ **new CuserClient**(`node`: IPFSAPI, `targetCID`: string, `opts`: CuserClientOptions): [CuserClient](cuserclient.md)

*Defined in client.js:48*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node` | IPFSAPI |  |
`targetCID` | string |  |
`opts` | CuserClientOptions |   |

**Returns:** [CuserClient](cuserclient.md)

## Methods

### subscribe

▸ **subscribe**(`topicId`: string, `subscriber`: any): (Anonymous function)

*Defined in client.js:161*

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
     // console.log(client.get(messageCid));
     break;
   case 'updated':
     // when a user updates a message
     // console.log(client.get(messageCid));
     break;
   case 'deleted':
     // when a user removes a message
     // console.log(client.get(messageCid));
     break;
 }
});
```

#### Parameters:

Name | Type |
------ | ------ |
`topicId` | string |
`subscriber` | any |

**Returns:** (Anonymous function)
