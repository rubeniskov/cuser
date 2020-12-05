# @cuser/crypto

## Index

### Classes

* [CoreCryptoBearer](docs/classes/corecryptobearer.md)
* [CuserCryptoCypher](docs/classes/cusercryptocypher.md)

### Functions

* [createBearer](docs/globals.md#createbearer)
* [createHash](docs/globals.md#createhash)

## Functions

### createBearer

▸ `Const`**createBearer**(`opts`: any): [CoreCryptoBearer](docs/classes/corecryptobearer.md)

*Defined in bearer.js:44*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`opts` | any |   |

**Returns:** [CoreCryptoBearer](docs/classes/corecryptobearer.md)

___

### createHash

▸ `Const`**createHash**(`secret`: string, `encoding?`: string): Buffer & string

*Defined in hash.js:8*

Returns a 32 bytes fixed length hash from a secret word

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`secret` | string | - |
`encoding` | string | "buffer" |

**Returns:** Buffer & string
