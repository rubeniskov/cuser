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
# Class: CoreCryptoBearer

## Hierarchy

* **CoreCryptoBearer**

## Index

### Constructors

* [constructor](docs/classes/corecryptobearer.md#constructor)

## Constructors

### constructor

\+ **new CoreCryptoBearer**(`opts`: any): [CoreCryptoBearer](docs/classes/corecryptobearer.md)

*Defined in bearer.js:14*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`opts` | any |   |

**Returns:** [CoreCryptoBearer](docs/classes/corecryptobearer.md)
# Class: CuserCryptoCypher

## Hierarchy

* **CuserCryptoCypher**
