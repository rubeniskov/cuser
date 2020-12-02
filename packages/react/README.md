<p align="center">
  <a href="./"><img width="250" src="https://raw.githubusercontent.com/rubeniskov/cuser/master/docs/logo.svg" alt="cuser logo" /></a>
</p>

# @cuser/react

## Status
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=react)](https://codecov.io/gh/rubeniskov/cuser)
[![npm](https://img.shields.io/npm/v/@cuser/react.svg)](https://www.npmjs.com/package/@cuser/react)


Cuser integration for [React](https://es.reactjs.org/)

checkout the [demo](../demo) for more details
## Installation

### NPM
```shell
npm install @cuser/react --save 
```

### YARN
```shell
yarn add @cuser/react
```

## Implementation

```jsx
const React = require('react');
const ReactDOM = require('react-dom');
const ipfs = require('ipfs');

const createClient = require('@cuser/client');

const Cuser = require('@cuser/react');

const node = ipfs.create({
  repo: "/tmp/testing"
});

const client = createClient(node);

ReactDOM.render(
  <Cuser {...data} client={client} topicId={"CUSTOM_TOPIC_ID"}/>,
  document.getElementId('root')
);
```

### Multiple instances

```jsx
const React = require('react');
const ReactDOM = require('react-dom');
const ipfs = require('ipfs');

const createClient = require('@cuser/client');

const Cuser = require('@cuser/react');
const CuserProvider = require('@cuser/react/Provider');

ReactDOM.render(
  <CuserProvider client={client} >
    <Cuser {...data} topicId={"CUSTOM_TOPIC_ID"}/>
  </CuserProvider>,
  document.getElementId('root')
);
```

<img src="./docs/demo_reel.gif" />

## References
- https://uiwjs.github.io/react-md-editor/
