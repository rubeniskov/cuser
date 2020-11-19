const { GraphType } = require('@cuser/proto/graphs');

const userReducer = (_, { payload: { user: { avatar, username, peerId } } = {} }) => ({
  type: GraphType.GRAPH_USER,
  username,
  peerId,
  avatar
});

module.exports = userReducer;
