# Class: ClientCorePubSub

Creates pubsub to listen changes on cuser network

## Hierarchy

* **ClientCorePubSub**

## Index

### Constructors

* [constructor](docs/classes/clientcorepubsub.md#constructor)

### Methods

* [broadcast](docs/classes/clientcorepubsub.md#broadcast)
* [subscribe](docs/classes/clientcorepubsub.md#subscribe)

## Constructors

### constructor

\+ **new ClientCorePubSub**(`node`: IPFSAPI \| Promise<IPFSAPI\>, `opts`: CuserClientPubSubOptions): [ClientCorePubSub](docs/classes/clientcorepubsub.md)

*Defined in [pubsub.js:72](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/pubsub.js#L72)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise<IPFSAPI\> |
`opts` | CuserClientPubSubOptions |

**Returns:** [ClientCorePubSub](docs/classes/clientcorepubsub.md)

## Methods

### broadcast

▸ **broadcast**(`payload`: any): void

*Defined in [pubsub.js:101](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/pubsub.js#L101)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`payload` | any |   |

**Returns:** void

___

### subscribe

▸ **subscribe**(`subscriber`: (payload: Object) => void): (Anonymous function)

*Defined in [pubsub.js:107](https://github.com/rubeniskov/cuser/blob/8b8610c/packages/core/pubsub.js#L107)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`subscriber` | (payload: Object) => void |   |

**Returns:** (Anonymous function)
