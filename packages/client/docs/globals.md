# @cuser/proto

## Index

### Classes

* [CuserClient](classes/cuserclient.md)

### Variables

* [CuserReader](globals.md#cuserreader)
* [createCore](globals.md#createcore)
* [fetch](globals.md#fetch)

### Functions

* [createClient](globals.md#createclient)
* [fetcher](globals.md#fetcher)
* [noPublisher](globals.md#nopublisher)
* [parseUrl](globals.md#parseurl)

## Variables

### CuserReader

• `Const` **CuserReader**: [CuserReader](globals.md#cuserreader) = require('@cuser/reader').CuserReader

*Defined in [client/client.js:6](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/client/client.js#L6)*

___

### createCore

• `Const` **createCore**: [createCore](globals.md#createcore) = require('@cuser/core')

*Defined in [client/client.js:7](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/client/client.js#L7)*

___

### fetch

• `Const` **fetch**: any = global.fetch \|\| require('node-' + 'fetch')

*Defined in [client/client.js:8](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/client/client.js#L8)*

*Defined in [client/fetch.js:3](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/client/fetch.js#L3)*

## Functions

### createClient

▸ `Const`**createClient**(`node`: IPFSAPI \| Promise<IPFSAPI\>, `cuserId`: string, `opts`: CuserClientOptions & CuserReaderOptions & CuserCoreOptions): [CuserClient](classes/cuserclient.md)

*Defined in [client/client.js:203](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/client/client.js#L203)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise<IPFSAPI\> |
`cuserId` | string |
`opts` | CuserClientOptions & CuserReaderOptions & CuserCoreOptions |

**Returns:** [CuserClient](classes/cuserclient.md)

___

### fetcher

▸ `Const`**fetcher**(`url`: string, `opts`: any): Promise<any\>

*Defined in [client/fetch.js:21](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/client/fetch.js#L21)*

Fetcher interface

#### Parameters:

Name | Type |
------ | ------ |
`url` | string |
`opts` | any |

**Returns:** Promise<any\>

___

### noPublisher

▸ `Const`**noPublisher**(): never

*Defined in [client/utils.js:17](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/client/utils.js#L17)*

No publisher function

**Returns:** never

___

### parseUrl

▸ `Const`**parseUrl**(`url`: string): string

*Defined in [client/utils.js:7](https://github.com/rubeniskov/cuser/blob/dceceb4/packages/client/utils.js#L7)*

if url guess url from global.location

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | string |   |

**Returns:** string
