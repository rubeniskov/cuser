<p align="center">
  <a href="./"><img width="250" src="https://raw.githubusercontent.com/rubeniskov/cuser/master/docs/logo.svg" alt="cuser logo" /></a>
</p>

# @cuser/publisher

## Status
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=publisher)](https://codecov.io/gh/rubeniskov/cuser)
[![npm](https://img.shields.io/npm/v/@cuser/publisher.svg)](https://www.npmjs.com/package/@cuser/publisher)
[![npm-downloads](https://img.shields.io/npm/dw/@cuser/publisher)](https://www.npmjs.com/package/@cuser/publisher)
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

\+ **new CuserPublisher**(`core`: [CuserCore](../globals.md#cusercore), `auth`: [CuserAuth](../globals.md#cuserauth), `opts`: CuserPublisherOptions & CuserStoreSerializeReducerOptions & CuserSerializeOptions & CuserDeserializeOptions): [CuserPublisher](cuserpublisher.md)

*Defined in [publisher/publisher.js:33](https://github.com/rubeniskov/cuser/blob/45e5718/packages/publisher/publisher.js#L33)*

#### Parameters:

Name | Type |
------ | ------ |
`core` | [CuserCore](../globals.md#cusercore) |
`auth` | [CuserAuth](../globals.md#cuserauth) |
`opts` | CuserPublisherOptions & CuserStoreSerializeReducerOptions & CuserSerializeOptions & CuserDeserializeOptions |

**Returns:** [CuserPublisher](cuserpublisher.md)

## Methods

### deleteMessage

▸ **deleteMessage**(`topicId`: string, `accessToken`: string, `messageId`: string): Promise<PublishResult\>

*Defined in [publisher/publisher.js:100](https://github.com/rubeniskov/cuser/blob/45e5718/packages/publisher/publisher.js#L100)*

Delete message and gets the computed cid

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`topicId` | string |  |
`accessToken` | string |  |
`messageId` | string |   |

**Returns:** Promise<PublishResult\>

___

### publishMessage

▸ **publishMessage**(`topicId`: string, `accessToken`: string, `data`: string): Promise<PublishResult\>

*Defined in [publisher/publisher.js:71](https://github.com/rubeniskov/cuser/blob/45e5718/packages/publisher/publisher.js#L71)*

Publish message and gets the computed cid

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`topicId` | string |  |
`accessToken` | string |  |
`data` | string |   |

**Returns:** Promise<PublishResult\>

___

### updateMessage

▸ **updateMessage**(`topicId`: string, `accessToken`: string, `messageId`: string, `data`: string): Promise<PublishResult\>

*Defined in [publisher/publisher.js:86](https://github.com/rubeniskov/cuser/blob/45e5718/packages/publisher/publisher.js#L86)*

Update message and gets computed cid

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`topicId` | string |  |
`accessToken` | string |  |
`messageId` | string |  |
`data` | string |   |

**Returns:** Promise<PublishResult\>
