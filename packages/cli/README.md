<p align="center">
  <a href="./"><img width="250" src="https://raw.githubusercontent.com/rubeniskov/cuser/master/docs/logo.svg" alt="cuser logo" /></a>
</p>

# @cuser/cli

## Status
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=cli)](https://codecov.io/gh/rubeniskov/cuser)
[![npm](https://img.shields.io/npm/v/@cuser/cli.svg)](https://www.npmjs.com/package/@cuser/cli)
[![npm-downloads](https://img.shields.io/npm/dw/@cuser/cli)](https://www.npmjs.com/package/@cuser/cli)

### cuser topic
```shell
Usage: cuser topic <name>

Positionals:
  name  The name of the topic, consider use a unique name to prevent collisions  [string] [required]

Options:
  --help     Show help  [boolean]
  --version  Show version number  [boolean]
  --token    cuser token provided by @cuser/server  [string] [required]

Examples:
  cuser topic <name> --token <cuser_token>  creates a topic identifier

copyright 2020
```

### cuser serve
```shell
Usage: cuser serve [options]
- To enable/disable capabitlities, use --<option>/--no-<options>

Options:
      --help               Show help                                   [boolean]
      --version            Show version number                         [boolean]
  -v, --verbose            Run with verbose logging   [boolean] [default: false]
  -m, --mount              Enpoint mount           [string] [default: "/api/v0"]
  -p, --port               Run server with custom port  [number] [default: 3000]
  -h, --host               Run server with custom host
                                                 [string] [default: "127.0.0.1"]
  -c, --cors               Enable cross-origin resource sharing
                                                      [boolean] [default: false]
      --rest               Enable the api rest         [boolean] [default: true]
      --rest-ui            Enable swagger-ui           [boolean] [default: true]
      --rest-reader        Enable reader              [boolean] [default: false]
      --rest-publisher     Enable publisher            [boolean] [default: true]
      --rest-mount         Endpoint mount            [string] [default: "/rest"]
      --graphql            Enable the api graphql                      [boolean]
      --graphql-ui         Enable graphiql             [boolean] [default: true]
      --graphql-reader     Enable reader              [boolean] [default: false]
      --graphql-publisher  Enable publisher            [boolean] [default: true]
      --graphql-mount      Endpoint mount             [string] [default: "/gql"]
      --ipfs-repo          Repo directory
                                   [string] [default: "$HOME/cuser"]

Examples:
  cuser serve --no-rest  starts the server without the restfull api, any
                            option with the prefix --rest will be ignored

copyright 2020
```
