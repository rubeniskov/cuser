// @ts-check
module.exports = {
  command: 'topic <name>',
  describe: 'creates topic identifier',
  builder: (yargs) => {
    yargs
      .positional('name', {
        describe: 'The name of the topic, consider use a unique name to prevent collisions',
        type: 'string'
      })
      .option('token', {
        required: true,
        type: 'string',
        describe: 'cuser token provided by @cuser/server',
      })
      .usage('Usage: $0 topic <name>')
      .example('$0 topic <name> --token <cuser_token>', 'creates a topic identifier')
      .epilog('copyright 2020')
      .wrap(null)
  },
  handler: async (argv) => {
    const { name, token } = argv

  }
}
