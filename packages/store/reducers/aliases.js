// @ts-check
// Utils
const wrapValidatorStateReducer = require('../utils/wrapValidatorStateReducer');
const wrapResolveReducerAliases = require('../utils/wrapResolveReducerAliases');

const aliases = wrapResolveReducerAliases({
  '@topics': require('./topics'),
  '@topic': require('./topic'),
  '@message': require('./message'),
  '@user': require('./user'),
  '@content': require('./content'),
  '@data': require('./data'),
  '@timestamp': require('./timestamp'),
  '@revision': require('./revision'),
  '@uuid': require('./uuid'),
});

module.exports = {
  ...aliases,
  '@topic': wrapValidatorStateReducer(
    require('@cuser/proto/schemas/GraphTopic.json'),
    aliases['@topic'],
  ),
  '@message': wrapValidatorStateReducer(
    require('@cuser/proto/schemas/GraphMessage.json'),
    aliases['@message'],
  ),
  '@user': wrapValidatorStateReducer(
    require('@cuser/proto/schemas/GraphUser.json'),
    aliases['@user'],
  ),
  '@content': wrapValidatorStateReducer(
    require('@cuser/proto/schemas/GraphContent.json'),
    aliases['@content'],
  ),
};
