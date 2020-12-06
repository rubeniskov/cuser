// @ts-check
const os = require('os')
const path = require('path')

const { create } = require('ipfs');
const restMiddleware = require('@cuser/express-middleware-rest');
const graphqlMiddleware = require('@cuser/express-middleware-graphql');
const createServer = require('@cuser/server');
const parseOptions = require('../parseOptions');
const createOptions = require('../createOptions');
const addOptions = require('../addOptions');

const ipfsDefaults = {
  repo: path.resolve(os.homedir(), 'cuser'),
}

module.exports = {
  command: 'serve',
  describe: 'starts the server',
  builder: (yargs) => {
    addOptions(yargs, createOptions({
      verbose: {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
      },
      secret: {
        alias: 's',
        type: 'string',
        description: 'Secret word'
      },
      mount: {
        alias: 'm',
        type: 'string',
        description: 'Path enpoint mount'
      },
      port: {
        alias: 'p',
        type: 'number',
        description: 'Listening port, default gets from PORT environment var'
      },
      host: {
        alias: 'h',
        type: 'string',
        description: 'Listening host, default gets from PORT environment var',
      },
      cors: {
        alias: 'c',
        type: 'boolean',
        description: 'Enable cross-origin resource sharing',
      },
      rest: {
        type: 'boolean',
        description: 'Enable the api rest',
      },
      ...createOptions({
        mount: {
          type: 'string',
          description: 'Path enpoint mount'
        },
        ui: {
          type: 'boolean',
          description: 'Enable swagger-ui'
        },
        reader: {
          type: 'boolean',
          description: 'Enable reading messages from api rest'
        },
        publisher: {
          type: 'boolean',
          description: 'Enable publishing messages from api rest'
        },
      }, { defaults: restMiddleware.defaults, prefix: 'rest-' }),
      graphql: {
        type: 'boolean',
        description: 'Enable the api graphql',
      },
      ...createOptions({
        mount: {
          type: 'string',
          description: 'Path enpoint mount'
        },
        ui: {
          type: 'boolean',
          description: 'Enable graphiql'
        },
        reader: {
          type: 'boolean',
          description: 'Enable reading messages from api graphql'
        },
        publisher: {
          type: 'boolean',
          description: 'Enable publishing messages from api graphql'
        },
      }, { defaults: graphqlMiddleware.defaults, prefix: 'gql-' }),
      ...createOptions({
        repo: {
          type: 'string',
          description: 'Repo directory'
        },
      }, { defaults: ipfsDefaults, prefix: 'ipfs-' })
    }, { defaults: createServer.defaults }))
      .usage('Usage: $0 serve [options]\n- To enable/disable capabitlities, use --<option>/--no-<options>')
      .example('$0 serve --no-rest', 'starts the server without the restfull api, any option with the prefix --rest will be ignored')
      .epilog('copyright 2020')
      .wrap(null)
  },
  handler: async (argv) => {
    const { ipfs, ...restOptions } = parseOptions({ ...argv, ipfs: true });
    const node = await create({
      ...ipfs,
      EXPERIMENTAL: {
        ipnsPubsub: true,
      },
    });
    createServer(node, restOptions);
  }
}
