// @ts-check
// Schemas
// @ts-ignore
const graphUserSchema = require('@cuser/proto/schemas/GraphUser.json');
// @ts-ignore
const graphContentSchema = require('@cuser/proto/schemas/GraphContent.json');
// @ts-ignore
const graphMessageSchema = require('@cuser/proto/schemas/GraphMessage.json');
// @ts-ignore
const graphTopicSchema = require('@cuser/proto/schemas/GraphTopic.json');
// Utils
const wrapValidatorStateReducer = require('../utils/wrapValidatorStateReducer');

const aliases = {
  '@topics': require('./topics'),
  '@topic': wrapValidatorStateReducer(graphTopicSchema, require('./topic')),
  '@message': wrapValidatorStateReducer({"anyOf": [graphMessageSchema, {"type": "null"}]}, require('./message')),
  '@user': wrapValidatorStateReducer(graphUserSchema, require('./user')),
  '@content': wrapValidatorStateReducer(graphContentSchema, require('./content')),
  '@data': require('./data'),
  '@timestamp': require('./timestamp'),
  '@revision': require('./revision'),
  '@uuid': require('./uuid'),
}

module.exports = aliases;
