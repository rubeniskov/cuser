
<h1 align="center">
  <a href="./"><img width="250" src="docs/logo.svg" alt="cuser logo" /></a>
</h1>

>**C**hatting via **U**ncentralized **S**ervice with **E**ndless **R**esources

<h3 align="center">No database, distributed message service, which provides a simple system to handle the resources through IPFS.</h3>

## Status
![unit-testing](https://github.com/rubeniskov/cuser/workflows/unit-testing/badge.svg)
![npm-publish](https://github.com/rubeniskov/cuser/workflows/npm-publish/badge.svg)
[![npm-downloads](https://img.shields.io/npm/dw/cuser)](https://www.npmjs.com/package/cuser)
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?token=mI2c282XxH)](https://codecov.io/gh/rubeniskov/cuser)

## Motivation

Many times I've try to create a webpage where the users can publish their opinions, but it becomes a hard task when you have to prepare an entire ecosystem to store such data. If the information is public, why not distribute such content all over the internet?.

Here is where `cuser` comes out, taking the powerfull of IPFS, stores the comments using the DAG graph.

This allows create [SPA's Single Page Aplications](https://es.wikipedia.org/wiki/Single-page_application) with capabilities of [statefull](https://www.atlantic.net/vps-hosting/what-is-stateless-stateful-models-web-development/) websites, blogs, etc... and minimize the storing impact of your server.

- Root CID represents the main article which is associated to a hash in IPFS, it can be created using the CID provider of IPFS if the article is not a IPFS distributed file. 



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
| name | version | coverage | downloads |
| ---------|---------|---------|--------- |
| **Cuser** |
| [`@cuser/core`](//github.com/rubeniskov/cuser/tree/master/packages/core) | [![npm](https://img.shields.io/npm/v/@cuser/core.svg)](//github.com/packages/core/releases) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=core)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/core)](https://www.npmjs.com/package/@cuser/core) |
| [`@cuser/client`](//github.com/rubeniskov/cuser/tree/master/packages/client) | [![npm](https://img.shields.io/npm/v/@cuser/client.svg)](//github.com/packages/client/releases) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=client)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/client)](https://www.npmjs.com/package/@cuser/client) |
| [`@cuser/cli`](//github.com/rubeniskov/cuser/tree/master/packages/cli) | [![npm](https://img.shields.io/npm/v/@cuser/cli.svg)](//github.com/packages/cli/releases) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=cli)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/cli)](https://www.npmjs.com/package/@cuser/cli) |
| [`@cuser/server`](//github.com/rubeniskov/cuser/tree/master/packages/server) | [![npm](https://img.shields.io/npm/v/@cuser/server.svg)](//github.com/packages/server/releases) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=server)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/server)](https://www.npmjs.com/package/@cuser/server) |
| [`@cuser/validator`](//github.com/rubeniskov/cuser/tree/master/packages/validator) | [![npm](https://img.shields.io/npm/v/@cuser/validator.svg)](//github.com/packages/validator/releases) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=validator)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/validator)](https://www.npmjs.com/package/@cuser/validator) |
| [`@cuser/store`](//github.com/rubeniskov/cuser/tree/master/packages/store) | [![npm](https://img.shields.io/npm/v/@cuser/store.svg)](//github.com/packages/store/releases) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=store)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/store)](https://www.npmjs.com/package/@cuser/store) |
| [`@cuser/auth`](//github.com/rubeniskov/cuser/tree/master/packages/auth) | [![npm](https://img.shields.io/npm/v/@cuser/auth.svg)](//github.com/packages/auth/releases) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=auth)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/auth)](https://www.npmjs.com/package/@cuser/auth) |
| [`@cuser/utils`](//github.com/rubeniskov/cuser/tree/master/packages/utils) | [![npm](https://img.shields.io/npm/v/@cuser/utils.svg)](//github.com/packages/utils/releases) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=utils)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/utils)](https://www.npmjs.com/package/@cuser/utils) |
| **Express middlewares** |
| [`@cuser/express-middleware-auth`](//github.com/rubeniskov/cuser/tree/master/packages/express-middleware-auth) | [![npm](https://img.shields.io/npm/v/@cuser/express-middleware-auth.svg)](//github.com/packages/express-middleware-auth/releases) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=express-middleware-auth)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/express-middleware-auth)](https://www.npmjs.com/package/@cuser/express-middleware-auth) |
| [`@cuser/express-middleware-rest`](//github.com/rubeniskov/cuser/tree/master/packages/express-middleware-rest) | [![npm](https://img.shields.io/npm/v/@cuser/express-middleware-rest.svg)](//github.com/packages/express-middleware-rest/releases) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=express-middleware-rest)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/express-middleware-rest)](https://www.npmjs.com/package/@cuser/express-middleware-rest) |
| [`@cuser/express-middleware-grapqhl`](//github.com/rubeniskov/cuser/tree/master/packages/express-middleware-grapqhl) | [![npm](https://img.shields.io/npm/v/@cuser/express-middleware-grapqhl.svg)](//github.com/packages/express-middleware-grapqhl/releases) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=express-middleware-grapqhl)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/express-middleware-grapqhl)](https://www.npmjs.com/package/@cuser/express-middleware-grapqhl) |
| **Intergrations** |
| [`@cuser/react`](//github.com/rubeniskov/cuser/tree/master/packages/react) | [![npm](https://img.shields.io/npm/v/@cuser/react.svg)](//github.com/packages/react/releases) | [![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=react)](https://codecov.io/gh/rubeniskov/cuser) | [![npm-downloads](https://img.shields.io/npm/dw/@cuser/react)](https://www.npmjs.com/package/@cuser/react) |
