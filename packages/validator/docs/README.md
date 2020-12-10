<p align="center">
  <a href="./"><img width="250" src="https://raw.githubusercontent.com/rubeniskov/cuser/master/docs/logo.svg" alt="cuser logo" /></a>
</p>

## Status
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=validator)](https://codecov.io/gh/rubeniskov/cuser)
[![npm](https://img.shields.io/npm/v/@cuser/validator.svg)](https://www.npmjs.com/package/@cuser/validator)
[![npm-downloads](https://img.shields.io/npm/dw/@cuser/validator)](https://www.npmjs.com/package/@cuser/validator)

# @cuser/validator

## Index

### Classes

* [ValidationError](docs/classes/validationerror.md)

### Functions

* [createValidator](docs/globals.md#createvalidator)

## Functions

### createValidator

▸ `Const`**createValidator**(`schema`: any): validate

*Defined in [index.js:27](https://github.com/rubeniskov/cuser/blob/61e448a/packages/validator/index.js#L27)*

Creates a validator which raise a ValidationError when the object doesn't fit the schema

#### Parameters:

Name | Type |
------ | ------ |
`schema` | any |

**Returns:** validate
# Class: ValidationError

Validator error class with nested errors

## Hierarchy

* Error

  ↳ **ValidationError**

## Index

### Constructors

* [constructor](docs/classes/validationerror.md#constructor)

## Constructors

### constructor

\+ **new ValidationError**(`message`: any, `validator`: ValidateFunction): [ValidationError](docs/classes/validationerror.md)

*Defined in [index.js:11](https://github.com/rubeniskov/cuser/blob/61e448a/packages/validator/index.js#L11)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | any |
`validator` | ValidateFunction |

**Returns:** [ValidationError](docs/classes/validationerror.md)
