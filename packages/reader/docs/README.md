<h1 align="center">
  <a href="./"><img width="250" src="docs/logo.svg" alt="cuser logo" /></a>
</h1>

>**C**hatting via **U**ncentralized **S**ervice with **E**ndless **R**esources

<h3 align="center">Distributed messaging service 🌐, with no database, no config and using IPFS layer to distribute the storage all over the universe ♾️.</h3>

## Status
[![unit-testing](https://github.com/rubeniskov/cuser/workflows/unit-testing/badge.svg)](https://github.com/rubeniskov/cuser/actions?query=workflow%3Aunit-testing)
[![npm-publish](https://github.com/rubeniskov/cuser/workflows/npm-publish/badge.svg)](https://github.com/rubeniskov/cuser/actions?query=workflow%3Anpm-publish)
[![npm-downloads](https://img.shields.io/npm/dw/cuser)](https://www.npmjs.com/package/cuser)
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?token=mI2c282XxH)](https://codecov.io/gh/rubeniskov/cuser)
[![patreon-donate](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://patreon.com/rubeniskov)
[![github-sponsor](https://img.shields.io/badge/github-donate-yellow.svg)](https://github.com/sponsors/rubeniskov)
[![paypal-sponsor](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://paypal.me/rubeniskov)

<p align="center">
  <a href="./"><img width="480" src="docs/demo_reel.gif" alt="cuser logo" /></a>
</p>

## Motivation

Many times I've try to create a webpage where the users can publish their opinions, but it becomes a hard task when you have to prepare an entire ecosystem to store such data. If the information is public, why not distribute such content all over the internet?.

Here is where `cuser` comes out, taking the powerfull of IPFS, stores the comments using the DAG graph.

This allows create [SPA's Single Page Aplications](https://es.wikipedia.org/wiki/Single-page_application) with capabilities of [statefull](https://www.atlantic.net/vps-hosting/what-is-stateless-stateful-models-web-development/) websites, blogs, etc... and minimize the storing impact of your server.

- Root CID represents the main article which is associated to a hash in IPFS, it can be created using the CID provider of IPFS if the article is not a IPFS distributed file. 

## Getting started

```shell
npm install -g cuser
```

## Spam detection

IPFS manage the data in a fashion way, due the CID is generated using a checksum of the content data, so its really easy to track if the user is publishing the same content in many articles and restrict. A user can not publish repeated comments with the same content.

## Restricted comments tree

A user can only replay the last comment, so a user can not replay on himself. This allows to make a conversation where the user only has the capability (if a mistake) to edit his last post until other user continues the conversation. 

## Removing / Editing comments

Even though IPFS is a permanet store due p2p distribution, if a user wants to remove a comment, can be done using hash tree which is manipulated at the server side allowing remove or replace a blocks.

## Security 

A user can only edits/remove his owns comments, this is a feature which the `@cuser/server` takes on. Checking the user token which is provided by the server itself adding this security layer for prevent users to change other users comments.
## Diagram 
<img src="./docs/diagram.svg">

## Packages
List of packages currently in existence for cuser
| name | description | version | coverage | downloads |
| ---------|---------|---------|---------|--------- |
| **Cuser** |
| [`@cuser/core`](//github.com/rubeniskov/cuser/tree/master/packages/core) |  | [![npm-version](https://img.shields.io/npm/v/@cuser/core.svg)](https://www.npmjs.com/package/@cuser/core) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=core)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/core)](https://www.npmjs.com/package/@cuser/core) |
| [`@cuser/publisher`](//github.com/rubeniskov/cuser/tree/master/packages/publisher) | publisher functionality | [![npm-version](https://img.shields.io/npm/v/@cuser/publisher.svg)](https://www.npmjs.com/package/@cuser/publisher) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=publisher)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/publisher)](https://www.npmjs.com/package/@cuser/publisher) |
| [`@cuser/crypto`](//github.com/rubeniskov/cuser/tree/master/packages/crypto) |  | [![npm-version](https://img.shields.io/npm/v/@cuser/crypto.svg)](https://www.npmjs.com/package/@cuser/crypto) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=crypto)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/crypto)](https://www.npmjs.com/package/@cuser/crypto) |
| [`@cuser/client`](//github.com/rubeniskov/cuser/tree/master/packages/client) | client logic for reading and publishing message using restfull transport | [![npm-version](https://img.shields.io/npm/v/@cuser/client.svg)](https://www.npmjs.com/package/@cuser/client) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=client)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/client)](https://www.npmjs.com/package/@cuser/client) |
| [`@cuser/cli`](//github.com/rubeniskov/cuser/tree/master/packages/cli) | command line interface | [![npm-version](https://img.shields.io/npm/v/@cuser/cli.svg)](https://www.npmjs.com/package/@cuser/cli) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=cli)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/cli)](https://www.npmjs.com/package/@cuser/cli) |
| [`@cuser/server`](//github.com/rubeniskov/cuser/tree/master/packages/server) | http server with express | [![npm-version](https://img.shields.io/npm/v/@cuser/server.svg)](https://www.npmjs.com/package/@cuser/server) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=server)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/server)](https://www.npmjs.com/package/@cuser/server) |
| [`@cuser/validator`](//github.com/rubeniskov/cuser/tree/master/packages/validator) | json schema validator | [![npm-version](https://img.shields.io/npm/v/@cuser/validator.svg)](https://www.npmjs.com/package/@cuser/validator) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=validator)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/validator)](https://www.npmjs.com/package/@cuser/validator) |
| [`@cuser/store`](//github.com/rubeniskov/cuser/tree/master/packages/store) | store tree changes managment | [![npm-version](https://img.shields.io/npm/v/@cuser/store.svg)](https://www.npmjs.com/package/@cuser/store) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=store)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/store)](https://www.npmjs.com/package/@cuser/store) |
| [`@cuser/auth`](//github.com/rubeniskov/cuser/tree/master/packages/auth) | auth core utility | [![npm-version](https://img.shields.io/npm/v/@cuser/auth.svg)](https://www.npmjs.com/package/@cuser/auth) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=auth)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/auth)](https://www.npmjs.com/package/@cuser/auth) |
| [`@cuser/utils`](//github.com/rubeniskov/cuser/tree/master/packages/utils) | common utils used by cuser | [![npm-version](https://img.shields.io/npm/v/@cuser/utils.svg)](https://www.npmjs.com/package/@cuser/utils) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=utils)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/utils)](https://www.npmjs.com/package/@cuser/utils) |
| [`@cuser/proto`](//github.com/rubeniskov/cuser/tree/master/packages/proto) | typing, schemas and services based in protocol buffers | [![npm-version](https://img.shields.io/npm/v/@cuser/proto.svg)](https://www.npmjs.com/package/@cuser/proto) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=proto)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/proto)](https://www.npmjs.com/package/@cuser/proto) |
| **Middlewares** |
| [`@cuser/express-middleware-auth`](//github.com/rubeniskov/cuser/tree/master/packages/express-middleware-auth) |  | [![npm-version](https://img.shields.io/npm/v/@cuser/express-middleware-auth.svg)](https://www.npmjs.com/package/@cuser/express-middleware-auth) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=express-middleware-auth)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/express-middleware-auth)](https://www.npmjs.com/package/@cuser/express-middleware-auth) |
| [`@cuser/express-middleware-rest`](//github.com/rubeniskov/cuser/tree/master/packages/express-middleware-rest) |  | [![npm-version](https://img.shields.io/npm/v/@cuser/express-middleware-rest.svg)](https://www.npmjs.com/package/@cuser/express-middleware-rest) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=express-middleware-rest)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/express-middleware-rest)](https://www.npmjs.com/package/@cuser/express-middleware-rest) |
| [`@cuser/express-middleware-graphql`](//github.com/rubeniskov/cuser/tree/master/packages/express-middleware-graphql) |  | [![npm-version](https://img.shields.io/npm/v/@cuser/express-middleware-graphql.svg)](https://www.npmjs.com/package/@cuser/express-middleware-graphql) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=express-middleware-graphql)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/express-middleware-graphql)](https://www.npmjs.com/package/@cuser/express-middleware-graphql) |
| **Integrations** |
| [`@cuser/react`](//github.com/rubeniskov/cuser/tree/master/packages/react) | react ui components for visualize cuser | [![npm-version](https://img.shields.io/npm/v/@cuser/react.svg)](https://www.npmjs.com/package/@cuser/react) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=react)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/react)](https://www.npmjs.com/package/@cuser/react) |
