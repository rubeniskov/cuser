// @ts-check
const path = require('path');
const Router = require('router');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const graphqlSchemaFilename = path.resolve(require.resolve('@cuser/proto/package.json'), '../graphql/main.graphql');

const defaults = {
  ui: process.env.NODE_ENV !== 'production',
  reader: false,
  publisher: true,
  mount: '/gql',
}

/**
 * @typedef {Object} CuserExpressMiddlewareGraphqlOptions
 * @prop {Boolean} [mount='/gql'] Path enpoint mount
 * @prop {Boolean} [ui=false] Enable graphiql
 * @prop {Boolean} [reader=false] Enable reading messages from api graphql
 * @prop {Boolean} [publisher=true] Enable publishing messages from api graphql
 */

const graphqlSchemaContent = require('fs').readFileSync(graphqlSchemaFilename, { encoding: 'utf8' })
  // graphqlHTTP does nos support Custom prefixed Query or Mutations
  .replace(/type\s+.*_(Query|Mutation)/g, (_,type) => {
    return `type ${type}`
  });

const graphqlSchema = buildSchema(graphqlSchemaContent);

const createGraphqlMiddleware = (cuser = require('@cuser/core')(), opts) => {
  const {
    mount,
    ui = true
  } = { ...defaults, ...opts };

  return Router()
    .use(mount, graphqlHTTP({
      graphiql: ui,
      schema: graphqlSchema,
      rootValue: {
        getMessages: () => ['hola'],
        publishMessage: ({ input }) => {
          return cuser.publish(input).then(({ value }) => ({ messageId: value.replace(/^\/ipfs\//, '') }));
        },
        deleteMessage: ({id, input}) => {
          console.log(id, input);
        },
        updateMessage: ({id, input}) => {
          console.log(id, input);
        },
      }
    }));
};

module.exports = createGraphqlMiddleware;
module.exports.defaults = defaults;
