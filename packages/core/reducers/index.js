const { GraphType } = require('@cuser/proto/graphs');
const { wrapReducerAction } = require('../validator');
const { createReducer } = require('../utils')
const publishMessageActionSchema = require('@cuser/proto/schemas/ActionPublishMessage.json');
const updateMessageActionSchema = require('@cuser/proto/schemas/ActionUpdateMessage.json');
const deleteMessageActionSchema = require('@cuser/proto/schemas/ActionDeleteMessage.json');

const {
  TYPE_ACTION_PUBLISH_MESSAGE,
  TYPE_ACTION_UPDATE_MESSAGE,
  TYPE_ACTION_DELETE_MESSAGE,
  TYPE_ACTION_DEFAULT
} = require('../types/actions');

const rootReducer = () => {
  return {
    type: GraphType.GRAPH_ROOT,
    topics: '@topics',
  };
}

module.exports = createReducer({
  [TYPE_ACTION_PUBLISH_MESSAGE]: wrapReducerAction(publishMessageActionSchema, rootReducer),
  [TYPE_ACTION_UPDATE_MESSAGE]: wrapReducerAction(updateMessageActionSchema, rootReducer),
  [TYPE_ACTION_DELETE_MESSAGE]: wrapReducerAction(deleteMessageActionSchema, rootReducer),
  // [TYPE_ACTION_DEFAULT]: rootReducer,
});
