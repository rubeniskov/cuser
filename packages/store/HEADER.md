<p align="center">
  <a href="./"><img width="250" src="https://raw.githubusercontent.com/rubeniskov/cuser/master/docs/logo.svg" alt="cuser logo" /></a>
</p>

# @cuser/store

## Status
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=store)](https://codecov.io/gh/rubeniskov/cuser)
[![npm](https://img.shields.io/npm/v/@cuser/store.svg)](https://www.npmjs.com/package/@cuser/store)
[![npm-downloads](https://img.shields.io/npm/dw/@cuser/store)](https://www.npmjs.com/package/@cuser/store)

Store dedicated to manage the tree changes of cuser state 

## Stricted mutation system

In order to prevent bad insertions in `dag` tree, is necessary implement a stricted validations, delegates to do `jsonschema` the validations in combination with reducers
