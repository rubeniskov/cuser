/** @typedef {import("./dag").WrappedDAG} WrappedDAG */
/** @typedef {import("ipfs-core/src/components").CID} CID */

const getRoot = async (node) => {
  const { id } = await node.id();
  const state = await node.name.pubsub.state();
  if (!state.enabled) {
    throw new Error('ipns pubsub is not enabled, options.EXPERIMENTAL.ipnsPubsub = true');
  }
  const [resolved] = await all(node.name.resolve(id))
  const { value = {} } = await node.dag.get(resolved) || {};
  return value;
}


const getTopic = () => {

}


/**
 * @param {WrappedDAG} dag
 * @param {CID} topicId
 * @param {CID} messageId
 */
const updateTopic = (dag, topicId, messageId) => {

  type: 'manifest',
  topics: {
    ...topics,
    [topicCid]: {
      likes: 1,
      comments:{
        count: (isNaN(commentCount) ? 0 : commentCount) + 1,
        last: messageId,
        reactions: [],
      }
    }
  }
}

module.exports = {
  getTopic(;
}
