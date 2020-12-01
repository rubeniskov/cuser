const path = require('path');
const Router = require('router');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const graphqlSchemaFilename = path.resolve(require.resolve('@cuser/proto/package.json'), '../graphql/main.graphql');

const graphqlSchemaContent = require('fs').readFileSync(graphqlSchemaFilename, { encoding: 'utf8' })
// graphqlHTTP does nos support Custom prefixed Query or Mutations
  .replace(/type\s+.*_(Query|Mutation)/g, (_,type) => {
    return `type ${type}`
  });

const graphqlSchema = buildSchema(graphqlSchemaContent);
// console.log(graphqlSchema);
module.exports = (cuser = require('@cuser/core')(), {
  graphiql = true
} = {}) => Router()
  .use(graphqlHTTP({
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
    },
    graphiql,
  }));
