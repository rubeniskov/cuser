# Class: CuserPublisher

## Hierarchy

* **CuserPublisher**

## Index

### Constructors

* [constructor](cuserpublisher.md#constructor)

### Methods

* [deleteMessage](cuserpublisher.md#deletemessage)
* [publishMessage](cuserpublisher.md#publishmessage)
* [updateMessage](cuserpublisher.md#updatemessage)

## Constructors

### constructor

\+ **new CuserPublisher**(`node`: IPFSAPI \| Promise\<IPFSAPI>, `secret`: string, `opts`: CuserStoreOptions & CuserCoreOptions & CuserAuthOptions): [CuserPublisher](cuserpublisher.md)

*Defined in [publisher/publisher.js:30](https://github.com/rubeniskov/cuser/blob/730a1b1/packages/publisher/publisher.js#L30)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise\<IPFSAPI> |
`secret` | string |
`opts` | CuserStoreOptions & CuserCoreOptions & CuserAuthOptions |

**Returns:** [CuserPublisher](cuserpublisher.md)

## Methods

### deleteMessage

▸ **deleteMessage**(`topicId`: string, `accessToken`: string, `messageId`: string): Promise\<PublishResult>

*Defined in [publisher/publisher.js:95](https://github.com/rubeniskov/cuser/blob/730a1b1/packages/publisher/publisher.js#L95)*

Delete message and gets the computed cid

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`topicId` | string |  |
`accessToken` | string |  |
`messageId` | string |   |

**Returns:** Promise\<PublishResult>

___

### publishMessage

▸ **publishMessage**(`topicId`: string, `accessToken`: string, `data`: string): Promise\<PublishResult>

*Defined in [publisher/publisher.js:62](https://github.com/rubeniskov/cuser/blob/730a1b1/packages/publisher/publisher.js#L62)*

Publish message and gets the computed cid

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`topicId` | string |  |
`accessToken` | string |  |
`data` | string |   |

**Returns:** Promise\<PublishResult>

___

### updateMessage

▸ **updateMessage**(`topicId`: string, `accessToken`: string, `messageId`: string, `data`: string): Promise\<PublishResult>

*Defined in [publisher/publisher.js:79](https://github.com/rubeniskov/cuser/blob/730a1b1/packages/publisher/publisher.js#L79)*

Update message and gets computed cid

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`topicId` | string |  |
`accessToken` | string |  |
`messageId` | string |  |
`data` | string |   |

**Returns:** Promise\<PublishResult>
