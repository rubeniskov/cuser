# @cuser/proto

## Index

### Classes

* [CuserAuth](classes/cuserauth.md)

### Variables

* [createBearer](globals.md#createbearer)
* [createHash](globals.md#createhash)
* [createKeygen](globals.md#createkeygen)
* [userSchema](globals.md#userschema)
* [validate](globals.md#validate)

### Functions

* [createAuth](globals.md#createauth)

## Variables

### createBearer

• `Const` **createBearer**: [createBearer](globals.md#createbearer) = require('@cuser/crypto/bearer')

*Defined in [auth/auth.js:7](https://github.com/rubeniskov/cuser/blob/f5d3af5/packages/auth/auth.js#L7)*

___

### createHash

• `Const` **createHash**: [createHash](globals.md#createhash) = require('@cuser/crypto/hash')

*Defined in [auth/auth.js:8](https://github.com/rubeniskov/cuser/blob/f5d3af5/packages/auth/auth.js#L8)*

___

### createKeygen

• `Const` **createKeygen**: [createKeygen](globals.md#createkeygen) = require('@cuser/crypto/keygen')

*Defined in [auth/auth.js:9](https://github.com/rubeniskov/cuser/blob/f5d3af5/packages/auth/auth.js#L9)*

___

### userSchema

• `Const` **userSchema**: object = require('@cuser/proto/schemas/PayloadUser.json')

*Defined in [auth/auth.js:10](https://github.com/rubeniskov/cuser/blob/f5d3af5/packages/auth/auth.js#L10)*

___

### validate

• `Const` **validate**: (value: any, message?: string) => void = require('@cuser/validator')(userSchema)

*Defined in [auth/auth.js:11](https://github.com/rubeniskov/cuser/blob/f5d3af5/packages/auth/auth.js#L11)*

## Functions

### createAuth

▸ `Const`**createAuth**(`node`: IPFSAPI \| Promise\<IPFSAPI>, `secret`: string, `opts`: CuserCryptoKeygenOptions): [CuserAuth](classes/cuserauth.md)

*Defined in [auth/auth.js:67](https://github.com/rubeniskov/cuser/blob/f5d3af5/packages/auth/auth.js#L67)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise\<IPFSAPI> |
`secret` | string |
`opts` | CuserCryptoKeygenOptions |

**Returns:** [CuserAuth](classes/cuserauth.md)
