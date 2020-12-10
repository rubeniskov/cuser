# Class: CuserAuth

Auth controller

## Hierarchy

* **CuserAuth**

## Index

### Constructors

* [constructor](cuserauth.md#constructor)

### Methods

* [authenticate](cuserauth.md#authenticate)
* [decode](cuserauth.md#decode)

## Constructors

### constructor

\+ **new CuserAuth**(`node`: IPFSAPI \| Promise\<IPFSAPI>, `secret`: string, `opts`: CuserCryptoKeygenOptions): [CuserAuth](cuserauth.md)

*Defined in [auth/auth.js:24](https://github.com/rubeniskov/cuser/blob/f5d3af5/packages/auth/auth.js#L24)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise\<IPFSAPI> |
`secret` | string |
`opts` | CuserCryptoKeygenOptions |

**Returns:** [CuserAuth](cuserauth.md)

## Methods

### authenticate

▸ **authenticate**(`payload`: PayloadUser): Promise\<string>

*Defined in [auth/auth.js:45](https://github.com/rubeniskov/cuser/blob/f5d3af5/packages/auth/auth.js#L45)*

#### Parameters:

Name | Type |
------ | ------ |
`payload` | PayloadUser |

**Returns:** Promise\<string>

___

### decode

▸ **decode**(`accessToken`: string): Promise\<PayloadUser & { iat: Number  }>

*Defined in [auth/auth.js:55](https://github.com/rubeniskov/cuser/blob/f5d3af5/packages/auth/auth.js#L55)*

#### Parameters:

Name | Type |
------ | ------ |
`accessToken` | string |

**Returns:** Promise\<PayloadUser & { iat: Number  }>

>}
