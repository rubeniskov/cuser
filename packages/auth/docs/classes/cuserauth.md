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

\+ **new CuserAuth**(`node`: IPFSAPI \| Promise\<IPFSAPI>, `secret`: string, `opts`: CuserAuthOptions): [CuserAuth](cuserauth.md)

*Defined in auth/auth.js:34*

#### Parameters:

Name | Type |
------ | ------ |
`node` | IPFSAPI \| Promise\<IPFSAPI> |
`secret` | string |
`opts` | CuserAuthOptions |

**Returns:** [CuserAuth](cuserauth.md)

## Methods

### authenticate

▸ **authenticate**(`payload`: any): Promise\<any>

*Defined in auth/auth.js:52*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`payload` | any |   |

**Returns:** Promise\<any>

___

### decode

▸ **decode**(`accessToken`: string): Promise\<any>

*Defined in auth/auth.js:61*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`accessToken` | string |   |

**Returns:** Promise\<any>
