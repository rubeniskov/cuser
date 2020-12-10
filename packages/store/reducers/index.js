// @ts-check
const { GraphType } = require('@cuser/proto/graphs');
const wrapValidatorActionReducer = require('../utils/wrapValidatorActionReducer');
const createResolveReducer = require('../utils/createResolveReducer');
const aliases = require('./aliases');

const createReducer = require('../utils/createReducer')
// @ts-ignore
const publishMessageActionSchema = require('@cuser/proto/schemas/ActionPublishMessage.json');
// @ts-ignore
const updateMessageActionSchema = require('@cuser/proto/schemas/ActionUpdateMessage.json');
// @ts-ignore
const deleteMessageActionSchema = require('@cuser/proto/schemas/ActionDeleteMessage.json');

const {
  TYPE_ACTION_PUBLISH_MESSAGE,
  TYPE_ACTION_UPDATE_MESSAGE,
  TYPE_ACTION_DELETE_MESSAGE,
} = require('../rtypes/actions');

const rootReducer = () => ({
  type: GraphType.GRAPH_ROOT,
  topics: '@topics',
});

module.exports = createResolveReducer(createReducer({
  [TYPE_ACTION_PUBLISH_MESSAGE]: wrapValidatorActionReducer(publishMessageActionSchema, rootReducer),
  [TYPE_ACTION_UPDATE_MESSAGE]: wrapValidatorActionReducer(updateMessageActionSchema, rootReducer),
  [TYPE_ACTION_DELETE_MESSAGE]: wrapValidatorActionReducer(deleteMessageActionSchema, rootReducer),
}), {
  aliases,
});
