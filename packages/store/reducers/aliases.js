// Schemas
const graphUserSchema = require('@cuser/proto/schemas/GraphUser.json');
const graphContentSchema = require('@cuser/proto/schemas/GraphContent.json');
const graphMessageSchema = require('@cuser/proto/schemas/GraphMessage.json');
const graphTopicSchema = require('@cuser/proto/schemas/GraphTopic.json');
// Utils
const wrapValidatorStateReducer = require('../utils/wrapValidatorStateReducer');


const aliases = {
  '@topics': require('./topics'),
  '@topic': wrapValidatorStateReducer(graphTopicSchema, require('./topic')),
  '@message': wrapValidatorStateReducer(graphMessageSchema, require('./message')),
  '@user': wrapValidatorStateReducer(graphUserSchema, require('./user')),
  '@content': wrapValidatorStateReducer(graphContentSchema, require('./content')),
  '@timestamp': require('./timestamp'),
  '@revision': require('./revision'),
  '@uuid': require('./uuid'),
}

module.exports = aliases;
