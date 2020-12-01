
<h1 align="center">
  <a href="./"><img width="250" src="docs/logo.svg" alt="libp2p hex logo" /></a>
</h1>

>**C**hatting via **U**ncentralized **S**ervice with **E**ndless **R**esources

<h3 align="center">No database, distributed message service, which provides a simple system to handle the resources through IPFS.</h3>

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

## Ip detection


// coors enabled
// app token 
// user token

api rest
POST /api/v1/publish/

graphql


## Diagram 
<img src="./docs/diagram.svg">




## RSA pair kesy generator



https://travistidwell.com/jsencrypt/demo/

https://jwt.io/

CLIENT_ID token generated from private key 

USER_TOKEN token generated from public key
 user information
 - avatar
 - network: google, facebook, github, linkedin



SPA 

https://www.oauth.com/oauth2-servers/single-page-apps/

https://example-app.com/cb?code=Yzk5ZDczMzRlNDEwY&state=TY2OTZhZGFk

<a href="https://authorization-server.com/authorize?response_type=code
     &client_id=mRkZGFjM&state=TY2OTZhZGFk">Connect Your Account</a>





## Packages
List of packages currently in existence for cuser
| Package | Version | CI | Coverage |
| ---------|---------|---------|--------- |
| **Cuser** |
| [`cuser/packages/core`](//github.com/cuser/core) | [![npm](https://img.shields.io/npm/v/cuser/packages/core.svg?maxAge=86400&style=flat-square)](//github.com/cuser/core/releases) | [![Travis CI](https://flat.badgen.net/travis/cuser/core/master)](https://travis-ci.com/cuser/core) | [![codecov](https://codecov.io/gh/cuser/core/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/cuser/core) |
| [`cuser/packages/client`](//github.com/cuser/client) | [![npm](https://img.shields.io/npm/v/cuser/packages/client.svg?maxAge=86400&style=flat-square)](//github.com/cuser/client/releases) | [![Travis CI](https://flat.badgen.net/travis/cuser/client/master)](https://travis-ci.com/cuser/client) | [![codecov](https://codecov.io/gh/cuser/client/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/cuser/client) |
| [`cuser/packages/cli`](//github.com/cuser/cli) | [![npm](https://img.shields.io/npm/v/cuser/packages/cli.svg?maxAge=86400&style=flat-square)](//github.com/cuser/cli/releases) | [![Travis CI](https://flat.badgen.net/travis/cuser/cli/master)](https://travis-ci.com/cuser/cli) | [![codecov](https://codecov.io/gh/cuser/cli/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/cuser/cli) |
| [`cuser/packages/server`](//github.com/cuser/server) | [![npm](https://img.shields.io/npm/v/cuser/packages/server.svg?maxAge=86400&style=flat-square)](//github.com/cuser/server/releases) | [![Travis CI](https://flat.badgen.net/travis/cuser/server/master)](https://travis-ci.com/cuser/server) | [![codecov](https://codecov.io/gh/cuser/server/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/cuser/server) |
| [`cuser/packages/validator`](//github.com/cuser/validator) | [![npm](https://img.shields.io/npm/v/cuser/packages/validator.svg?maxAge=86400&style=flat-square)](//github.com/cuser/validator/releases) | [![Travis CI](https://flat.badgen.net/travis/cuser/validator/master)](https://travis-ci.com/cuser/validator) | [![codecov](https://codecov.io/gh/cuser/validator/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/cuser/validator) |
| [`cuser/packages/store`](//github.com/cuser/store) | [![npm](https://img.shields.io/npm/v/cuser/packages/store.svg?maxAge=86400&style=flat-square)](//github.com/cuser/store/releases) | [![Travis CI](https://flat.badgen.net/travis/cuser/store/master)](https://travis-ci.com/cuser/store) | [![codecov](https://codecov.io/gh/cuser/store/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/cuser/store) |
| [`cuser/packages/auth`](//github.com/cuser/auth) | [![npm](https://img.shields.io/npm/v/cuser/packages/auth.svg?maxAge=86400&style=flat-square)](//github.com/cuser/auth/releases) | [![Travis CI](https://flat.badgen.net/travis/cuser/auth/master)](https://travis-ci.com/cuser/auth) | [![codecov](https://codecov.io/gh/cuser/auth/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/cuser/auth) |
| **Express middlewares** |
| [`cuser/packages/express-middleware-auth`](//github.com/cuser/express-middleware-auth) | [![npm](https://img.shields.io/npm/v/cuser/packages/express-middleware-auth.svg?maxAge=86400&style=flat-square)](//github.com/cuser/express-middleware-auth/releases) | [![Travis CI](https://flat.badgen.net/travis/cuser/express-middleware-auth/master)](https://travis-ci.com/cuser/express-middleware-auth) | [![codecov](https://codecov.io/gh/cuser/express-middleware-auth/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/cuser/express-middleware-auth) |
| [`cuser/packages/express-middleware-rest`](//github.com/cuser/express-middleware-rest) | [![npm](https://img.shields.io/npm/v/cuser/packages/express-middleware-rest.svg?maxAge=86400&style=flat-square)](//github.com/cuser/express-middleware-rest/releases) | [![Travis CI](https://flat.badgen.net/travis/cuser/express-middleware-rest/master)](https://travis-ci.com/cuser/express-middleware-rest) | [![codecov](https://codecov.io/gh/cuser/express-middleware-rest/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/cuser/express-middleware-rest) |
| [`cuser/packages/express-middleware-grapqhl`](//github.com/cuser/express-middleware-grapqhl) | [![npm](https://img.shields.io/npm/v/cuser/packages/express-middleware-grapqhl.svg?maxAge=86400&style=flat-square)](//github.com/cuser/express-middleware-grapqhl/releases) | [![Travis CI](https://flat.badgen.net/travis/cuser/express-middleware-grapqhl/master)](https://travis-ci.com/cuser/express-middleware-grapqhl) | [![codecov](https://codecov.io/gh/cuser/express-middleware-grapqhl/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/cuser/express-middleware-grapqhl) |
| **Intergrations** |
| [`cuser/packages/react`](//github.com/cuser/react) | [![npm](https://img.shields.io/npm/v/cuser/packages/react.svg?maxAge=86400&style=flat-square)](//github.com/cuser/react/releases) | [![Travis CI](https://flat.badgen.net/travis/cuser/react/master)](https://travis-ci.com/cuser/react) | [![codecov](https://codecov.io/gh/cuser/react/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/cuser/react) |
