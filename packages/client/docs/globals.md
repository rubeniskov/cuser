# @cuser/proto

## Index

### Classes

* [CuserClient](classes/cuserclient.md)

### Variables

* [createCore](globals.md#createcore)
* [createMessageIterator](globals.md#createmessageiterator)
* [fetch](globals.md#fetch)
* [toArray](globals.md#toarray)

### Functions

* [createClient](globals.md#createclient)
* [fetcher](globals.md#fetcher)
* [noPublisher](globals.md#nopublisher)
* [parseUrl](globals.md#parseurl)

## Variables

### createCore

• `Const` **createCore**: any = require('@cuser/core')

*Defined in [client/client.js:6](https://github.com/rubeniskov/cuser/blob/60e0918/packages/client/client.js#L6)*

___

### createMessageIterator

• `Const` **createMessageIterator**: messageIterator = require('./messageIterator')

*Defined in [client/client.js:9](https://github.com/rubeniskov/cuser/blob/60e0918/packages/client/client.js#L9)*

___

### fetch

• `Const` **fetch**: [fetcher](globals.md#fetcher) = require('./fetch')

*Defined in [client/fetch.js:3](https://github.com/rubeniskov/cuser/blob/60e0918/packages/client/fetch.js#L3)*

*Defined in [client/client.js:8](https://github.com/rubeniskov/cuser/blob/60e0918/packages/client/client.js#L8)*

___

### toArray

• `Const` **toArray**: any = require('async-iterator-to-array')

*Defined in [client/client.js:7](https://github.com/rubeniskov/cuser/blob/60e0918/packages/client/client.js#L7)*

## Functions

### createClient

▸ `Const`**createClient**(`node`: IPFSAPI, `cuserId`: string, `opts`: CuserClientOptions): [CuserClient](classes/cuserclient.md)

*Defined in [client/client.js:298](https://github.com/rubeniskov/cuser/blob/60e0918/packages/client/client.js#L298)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI |
`cuserId` | string |
`opts` | CuserClientOptions |

**Returns:** [CuserClient](classes/cuserclient.md)

___

### fetcher

▸ `Const`**fetcher**(`url`: string, `opts`: any): Promise\<any>

*Defined in [client/fetch.js:21](https://github.com/rubeniskov/cuser/blob/60e0918/packages/client/fetch.js#L21)*

Fetcher interface

#### Parameters:

Name | Type |
------ | ------ |
`url` | string |
`opts` | any |

**Returns:** Promise\<any>

___

### noPublisher

▸ `Const`**noPublisher**(): never

*Defined in [client/utils.js:17](https://github.com/rubeniskov/cuser/blob/60e0918/packages/client/utils.js#L17)*

No publisher function

**Returns:** never

___

### parseUrl

▸ `Const`**parseUrl**(`url`: string): string

*Defined in [client/utils.js:7](https://github.com/rubeniskov/cuser/blob/60e0918/packages/client/utils.js#L7)*

if url guess url from global.location

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | string |   |

**Returns:** string
