<p align="center">
  <a href="./"><img width="250" src="https://raw.githubusercontent.com/rubeniskov/cuser/master/docs/logo.svg" alt="cuser logo" /></a>
</p>

## Status
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=crypto)](https://codecov.io/gh/rubeniskov/cuser)
[![npm](https://img.shields.io/npm/v/@cuser/crypto.svg)](https://www.npmjs.com/package/@cuser/crypto)
[![npm-downloads](https://img.shields.io/npm/dw/@cuser/crypto)](https://www.npmjs.com/package/@cuser/crypto)


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
# Class: CoreCryptoBearer

## Hierarchy

* **CoreCryptoBearer**

## Index

### Constructors

* [constructor](docs/classes/corecryptobearer.md#constructor)

## Constructors

### constructor

\+ **new CoreCryptoBearer**(`secret`: string, `opts`: any): [CoreCryptoBearer](docs/classes/corecryptobearer.md)

*Defined in [bearer.js:14](https://github.com/rubeniskov/cuser/blob/79d8370/packages/crypto/bearer.js#L14)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`secret` | string |  |
`opts` | any |   |

**Returns:** [CoreCryptoBearer](docs/classes/corecryptobearer.md)
# Class: CuserCryptoCypher

## Hierarchy

* **CuserCryptoCypher**
# Class: CuserCryptoKeygen

Generate rsa pair keys from ipfs

## Hierarchy

* **CuserCryptoKeygen**

## Index

### Constructors

* [constructor](docs/classes/cusercryptokeygen.md#constructor)

### Methods

* [generateKeys](docs/classes/cusercryptokeygen.md#generatekeys)

## Constructors

### constructor

\+ **new CuserCryptoKeygen**(`node`: IPFSAPI \| Promise\<IPFSAPI>, `secret`: string, `opts`: CuserCryptoKeygenOptions): [CuserCryptoKeygen](docs/classes/cusercryptokeygen.md)

*Defined in [keygen.js:16](https://github.com/rubeniskov/cuser/blob/79d8370/packages/crypto/keygen.js#L16)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node` | IPFSAPI \| Promise\<IPFSAPI> |  |
`secret` | string |  |
`opts` | CuserCryptoKeygenOptions |   |

**Returns:** [CuserCryptoKeygen](docs/classes/cusercryptokeygen.md)

## Methods

### generateKeys

▸ **generateKeys**(`key`: string): Promise\<{ privateKey: any ; publicKey: any  }>

*Defined in [keygen.js:34](https://github.com/rubeniskov/cuser/blob/79d8370/packages/crypto/keygen.js#L34)*

#### Parameters:

Name | Type |
------ | ------ |
`key` | string |

**Returns:** Promise\<{ privateKey: any ; publicKey: any  }>
