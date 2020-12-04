# Class: CuserPublisher

## Hierarchy

* **CuserPublisher**

## Index

### Constructors

* [constructor](cuserpublisher.md#constructor)

### Methods

* [delete](cuserpublisher.md#delete)
* [publish](cuserpublisher.md#publish)
* [update](cuserpublisher.md#update)

## Constructors

### constructor

\+ **new CuserPublisher**(`core`: CuserCore, `opts`: CuserStoreOptions): [CuserPublisher](cuserpublisher.md)

*Defined in publisher/publisher.js:23*

#### Parameters:

Name | Type |
------ | ------ |
`core` | CuserCore |
`opts` | CuserStoreOptions |

**Returns:** [CuserPublisher](cuserpublisher.md)

## Methods

### delete

▸ **delete**(`payload`: PayloadDeleteMessage): Promise\<PublishResult>

*Defined in publisher/publisher.js:74*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`payload` | PayloadDeleteMessage |   |

**Returns:** Promise\<PublishResult>

___

### publish

▸ **publish**(`payload`: PayloadPublishMessage): Promise\<PublishResult>

*Defined in publisher/publisher.js:52*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`payload` | PayloadPublishMessage |   |

**Returns:** Promise\<PublishResult>

___

### update

▸ **update**(`payload`: PayloadUpdateMessage): Promise\<PublishResult>

*Defined in publisher/publisher.js:63*

Update message and gets computed cid

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`payload` | PayloadUpdateMessage |   |

**Returns:** Promise\<PublishResult>
