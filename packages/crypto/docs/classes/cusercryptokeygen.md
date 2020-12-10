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
