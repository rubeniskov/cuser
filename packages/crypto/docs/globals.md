# @cuser/crypto

## Index

### Classes

* [CoreCryptoBearer](docs/classes/corecryptobearer.md)
* [CuserCryptoCypher](docs/classes/cusercryptocypher.md)
* [CuserCryptoKeygen](docs/classes/cusercryptokeygen.md)

### Variables

* [pki](docs/globals.md#pki)

### Functions

* [createBearer](docs/globals.md#createbearer)
* [createHash](docs/globals.md#createhash)
* [createKeygen](docs/globals.md#createkeygen)

## Variables

### pki

•  **pki**: any

*Defined in [keygen.js:6](https://github.com/rubeniskov/cuser/blob/79d8370/packages/crypto/keygen.js#L6)*

## Functions

### createBearer

▸ `Const`**createBearer**(`secret`: string, `opts`: any): [CoreCryptoBearer](docs/classes/corecryptobearer.md)

*Defined in [bearer.js:45](https://github.com/rubeniskov/cuser/blob/79d8370/packages/crypto/bearer.js#L45)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`secret` | string |  |
`opts` | any |   |

**Returns:** [CoreCryptoBearer](docs/classes/corecryptobearer.md)

___

### createHash

▸ `Const`**createHash**(`secret`: string, `encoding?`: string): Buffer & string

*Defined in [hash.js:9](https://github.com/rubeniskov/cuser/blob/79d8370/packages/crypto/hash.js#L9)*

Returns a 32 bytes fixed length hash from a secret word

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`secret` | string | - |
`encoding` | string | "buffer" |

**Returns:** Buffer & string

___

### createKeygen

▸ `Const`**createKeygen**(`node`: IPFSAPI \| Promise\<IPFSAPI>, `secret`: string, `opts`: CuserCryptoKeygenOptions): [CuserCryptoKeygen](docs/classes/cusercryptokeygen.md)

*Defined in [keygen.js:55](https://github.com/rubeniskov/cuser/blob/79d8370/packages/crypto/keygen.js#L55)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise\<IPFSAPI> |
`secret` | string |
`opts` | CuserCryptoKeygenOptions |

**Returns:** [CuserCryptoKeygen](docs/classes/cusercryptokeygen.md)
