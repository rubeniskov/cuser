# @cuser/express-middleware-rest

## Index

### Variables

* [Router](globals.md#router)
* [authGuard](globals.md#authguard)
* [bodyParser](globals.md#bodyparser)
* [createPublisher](globals.md#createpublisher)
* [createReader](globals.md#createreader)
* [debug](globals.md#debug)
* [defaultWrapper](globals.md#defaultwrapper)
* [description](globals.md#description)
* [name](globals.md#name)
* [version](globals.md#version)

### Functions

* [createRestMiddleware](globals.md#createrestmiddleware)
* [createRestPublisherMiddleware](globals.md#createrestpublishermiddleware)
* [createRestReaderMiddleware](globals.md#createrestreadermiddleware)
* [parseOpts](globals.md#parseopts)
* [swaggerRouter](globals.md#swaggerrouter)
* [wrapper](globals.md#wrapper)

### Object literals

* [defaults](globals.md#defaults)

## Variables

### Router

• `Const` **Router**: any = require('router')

*Defined in [express-middleware-rest/middleware.js:4](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/middleware.js#L4)*

*Defined in [express-middleware-rest/publisher.js:8](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/publisher.js#L8)*

*Defined in [express-middleware-rest/reader.js:6](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/reader.js#L6)*

___

### authGuard

•  **authGuard**: any

*Defined in [express-middleware-rest/publisher.js:10](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/publisher.js#L10)*

___

### bodyParser

• `Const` **bodyParser**: any = require('body-parser')

*Defined in [express-middleware-rest/middleware.js:6](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/middleware.js#L6)*

___

### createPublisher

• `Const` **createPublisher**: [createPublisher](globals.md#createpublisher) = require('@cuser/publisher')

*Defined in [express-middleware-rest/publisher.js:9](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/publisher.js#L9)*

___

### createReader

• `Const` **createReader**: [createReader](globals.md#createreader) = require('@cuser/reader')

*Defined in [express-middleware-rest/reader.js:7](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/reader.js#L7)*

___

### debug

• `Const` **debug**: Debugger = require('debug')('cuser:server:rest')

*Defined in [express-middleware-rest/middleware.js:5](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/middleware.js#L5)*

___

### defaultWrapper

• `Const` **defaultWrapper**: [wrapper](globals.md#wrapper) = require('./wrapper')

*Defined in [express-middleware-rest/publisher.js:11](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/publisher.js#L11)*

*Defined in [express-middleware-rest/reader.js:8](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/reader.js#L8)*

___

### description

•  **description**: string

*Defined in [express-middleware-rest/middleware.js:7](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/middleware.js#L7)*

___

### name

•  **name**: string

*Defined in [express-middleware-rest/middleware.js:7](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/middleware.js#L7)*

___

### version

•  **version**: string

*Defined in [express-middleware-rest/middleware.js:7](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/middleware.js#L7)*

## Functions

### createRestMiddleware

▸ `Const`**createRestMiddleware**(`core`: CuserCore, `auth`: CuserAuth, `opts`: CuserExpressMiddlewareRestOptions): any

*Defined in [express-middleware-rest/middleware.js:33](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/middleware.js#L33)*

#### Parameters:

Name | Type |
------ | ------ |
`core` | CuserCore |
`auth` | CuserAuth |
`opts` | CuserExpressMiddlewareRestOptions |

**Returns:** any

___

### createRestPublisherMiddleware

▸ `Const`**createRestPublisherMiddleware**(`core`: CuserCore, `auth`: CuserAuth, `opts?`: any): any

*Defined in [express-middleware-rest/publisher.js:25](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/publisher.js#L25)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`core` | CuserCore | - |
`auth` | CuserAuth | - |
`opts` | any | {} |

**Returns:** any

___

### createRestReaderMiddleware

▸ `Const`**createRestReaderMiddleware**(`core`: CuserCore, `opts?`: CuserExpressMiddlewareRestReaderOptions & CuserReaderOptions): any

*Defined in [express-middleware-rest/reader.js:21](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/reader.js#L21)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`core` | CuserCore | - |
`opts` | CuserExpressMiddlewareRestReaderOptions & CuserReaderOptions | {} |

**Returns:** any

___

### parseOpts

▸ `Const`**parseOpts**(`opts`: any): any

*Defined in [express-middleware-rest/middleware.js:17](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/middleware.js#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`opts` | any |

**Returns:** any

___

### swaggerRouter

▸ `Const`**swaggerRouter**(`opts`: any): any

*Defined in [express-middleware-rest/swagger.js:6](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/swagger.js#L6)*

#### Parameters:

Name | Type |
------ | ------ |
`opts` | any |

**Returns:** any

___

### wrapper

▸ `Const`**wrapper**(`wrappedHandler`: Function): any

*Defined in [express-middleware-rest/wrapper.js:14](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/wrapper.js#L14)*

#### Parameters:

Name | Type |
------ | ------ |
`wrappedHandler` | Function |

**Returns:** any

## Object literals

### defaults

▪ `Const` **defaults**: object

*Defined in [express-middleware-rest/middleware.js:10](https://github.com/rubeniskov/cuser/blob/6ec8737/packages/express-middleware-rest/middleware.js#L10)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`mount` | string | "/rest" |
`publisher` | boolean | true |
`reader` | boolean | false |
`ui` | boolean | process.env.NODE\_ENV !== 'production' |
