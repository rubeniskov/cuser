# @cuser/utils

## Index

### Functions

* [assert](docs/globals.md#assert)
* [formatErr](docs/globals.md#formaterr)
* [timestamp](docs/globals.md#timestamp)

## Functions

### assert

▸ `Const`**assert**(`assertion`: any, ...`args`: any[]): void

*Defined in [assert.js:7](https://github.com/rubeniskov/cuser/blob/ad00da2/packages/utils/assert.js#L7)*

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

*Defined in [formatErr.js:10](https://github.com/rubeniskov/cuser/blob/ad00da2/packages/utils/formatErr.js#L10)*

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

*Defined in [timestamp.js:5](https://github.com/rubeniskov/cuser/blob/ad00da2/packages/utils/timestamp.js#L5)*

Gets current timestamp

**Returns:** number
