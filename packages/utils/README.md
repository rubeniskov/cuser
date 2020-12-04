<p align="center">
  <a href="./"><img width="250" src="https://raw.githubusercontent.com/rubeniskov/cuser/master/docs/logo.svg" alt="cuser logo" /></a>
</p>

## Status
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=utils)](https://codecov.io/gh/rubeniskov/cuser)
[![npm](https://img.shields.io/npm/v/@cuser/utils.svg)](https://www.npmjs.com/package/@cuser/utils)
[![npm-downloads](https://img.shields.io/npm/dw/@cuser/utils)](https://www.npmjs.com/package/@cuser/utils)


# @cuser/utils

## Index

### Functions

* [assert](docs/globals.md#assert)
* [formatErr](docs/globals.md#formaterr)
* [timestamp](docs/globals.md#timestamp)

## Functions

### assert

▸ `Const`**assert**(`assertion`: any, ...`args`: any[]): void

*Defined in [assert.js:7](https://github.com/rubeniskov/cuser/blob/4d78bfd/packages/utils/assert.js#L7)*

Asserts a condition to raise an error when not fullfilled

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`assertion` | any | - |
`...args` | any[] |   |

**Returns:** void

___

### formatErr

▸ `Const`**formatErr**(...`args`: any[]): Error

*Defined in [formatErr.js:10](https://github.com/rubeniskov/cuser/blob/4d78bfd/packages/utils/formatErr.js#L10)*

Formats an error like sprintf

**`example`** 
formatErr('messsage errro with argument %s', 'foo')
formatErr(TypeError, 'messsage errro with argument %s and custom Error constructor', 'foo')

#### Parameters:

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** Error

___

### timestamp

▸ `Const`**timestamp**(): number

*Defined in [timestamp.js:5](https://github.com/rubeniskov/cuser/blob/4d78bfd/packages/utils/timestamp.js#L5)*

Gets current timestamp

**Returns:** number
