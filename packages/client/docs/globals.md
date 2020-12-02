# @cuser/client

## Index

### Classes

* [CuserClient](classes/cuserclient.md)

### Variables

* [createPubSub](globals.md#createpubsub)
* [fetch](globals.md#fetch)
* [messageIterator](globals.md#messageiterator)
* [noPublisher](globals.md#nopublisher)
* [parseUrl](globals.md#parseurl)
* [toArray](globals.md#toarray)

### Functions

* [createClient](globals.md#createclient)
* [fetcher](globals.md#fetcher)

## Variables

### createPubSub

• `Const` **createPubSub**: [createPubSub](globals.md#createpubsub) = require('./pubsub')

*Defined in [client.js:4](https://github.com/rubeniskov/cuser/blob/21afbe1/packages/client/client.js#L4)*

___

### fetch

• `Const` **fetch**: [fetcher](globals.md#fetcher) = require('./fetch')

*Defined in [fetch.js:2](https://github.com/rubeniskov/cuser/blob/21afbe1/packages/client/fetch.js#L2)*

*Defined in [client.js:3](https://github.com/rubeniskov/cuser/blob/21afbe1/packages/client/client.js#L3)*

___

### messageIterator

• `Const` **messageIterator**: [messageIterator](globals.md#messageiterator) = require('./messageIterator')

*Defined in [client.js:5](https://github.com/rubeniskov/cuser/blob/21afbe1/packages/client/client.js#L5)*

___

### noPublisher

•  **noPublisher**: [noPublisher](globals.md#nopublisher)

*Defined in [client.js:7](https://github.com/rubeniskov/cuser/blob/21afbe1/packages/client/client.js#L7)*

___

### parseUrl

•  **parseUrl**: [parseUrl](globals.md#parseurl)

*Defined in [client.js:7](https://github.com/rubeniskov/cuser/blob/21afbe1/packages/client/client.js#L7)*

___

### toArray

• `Const` **toArray**: any = require('async-iterator-to-array')

*Defined in [client.js:6](https://github.com/rubeniskov/cuser/blob/21afbe1/packages/client/client.js#L6)*

## Functions

### createClient

▸ `Const`**createClient**(`node`: any, `cuserId`: any, `opts`: any): [CuserClient](classes/cuserclient.md)

*Defined in [client.js:189](https://github.com/rubeniskov/cuser/blob/21afbe1/packages/client/client.js#L189)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | any |
`cuserId` | any |
`opts` | any |

**Returns:** [CuserClient](classes/cuserclient.md)

___

### fetcher

▸ `Const`**fetcher**(`url`: string, `opts`: any): Promise\<any>

*Defined in [fetch.js:20](https://github.com/rubeniskov/cuser/blob/21afbe1/packages/client/fetch.js#L20)*

Fetcher interface

#### Parameters:

Name | Type |
------ | ------ |
`url` | string |
`opts` | any |

**Returns:** Promise\<any>
