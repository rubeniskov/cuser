**[@cuser/client](README.md)**

> Globals

# @cuser/client

## Index

### Classes

* [CuserClient](classes/cuserclient.md)

### Variables

* [EventEmitter](globals.md#eventemitter)
* [\_fetch](globals.md#_fetch)
* [createPubSub](globals.md#createpubsub)
* [fetch](globals.md#fetch)

### Functions

* [fetcher](globals.md#fetcher)

## Variables

### EventEmitter

• `Const` **EventEmitter**: [EventEmitter](globals.md#eventemitter) = require('events')

*Defined in [client.js:3](https://github.com/rubeniskov/cuser/blob/ad6573a/packages/client/client.js#L3)*

___

### \_fetch

• `Const` **\_fetch**: [fetcher](globals.md#fetcher) = require('./fetcher')

*Defined in [client.js:4](https://github.com/rubeniskov/cuser/blob/ad6573a/packages/client/client.js#L4)*

___

### createPubSub

• `Const` **createPubSub**: [createPubSub](globals.md#createpubsub) = require('./pubsub')

*Defined in [client.js:5](https://github.com/rubeniskov/cuser/blob/ad6573a/packages/client/client.js#L5)*

___

### fetch

• `Const` **fetch**: any = global.fetch \|\| require('node-' + 'fetch')

*Defined in [fetcher.js:2](https://github.com/rubeniskov/cuser/blob/ad6573a/packages/client/fetcher.js#L2)*

## Functions

### fetcher

▸ `Const`**fetcher**(`url`: string, `opts`: any): Promise\<any>

*Defined in [fetcher.js:20](https://github.com/rubeniskov/cuser/blob/ad6573a/packages/client/fetcher.js#L20)*

Fetcher interface

#### Parameters:

Name | Type |
------ | ------ |
`url` | string |
`opts` | any |

**Returns:** Promise\<any>
