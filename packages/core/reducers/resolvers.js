const { wrapReducer } = require('../validator');
const graphUserSchema = require('@cuser/proto/schemas/GraphUser.json');
// const graphTopicsSchema = require('@cuser/proto/schemas/GraphTopics.json');
const graphContentSchema = require('@cuser/proto/schemas/GraphContent.json');
const graphMessageSchema = require('@cuser/proto/schemas/GraphMessage.json');
const graphTopicSchema = require('@cuser/proto/schemas/GraphTopic.json');

const resolvers = {
  // '@topics': wrapReducer(graphTopicsSchema, require('./topics')),
  '@topics': require('./topics'),
  '@user': wrapReducer(graphUserSchema, require('./user')),
  '@content': wrapReducer(graphContentSchema, require('./content')),
  '@message': wrapReducer(graphMessageSchema, require('./message')),
  '@topic': wrapReducer(graphTopicSchema, require('./topic')),
  '@timestamp': require('./timestamp'),
  '@revision': require('./revision'),
  '@uuid': require('./uuid'),
}

module.exports = resolvers
