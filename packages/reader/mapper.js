// @ts-check
/** @typedef {import('@cuser/proto/graphs').GraphMessage} GraphMessage */

/**
 * @param {(hash: String) => Promise<Object>} resolve
 * @returns {(message: Object) => Promise<GraphMessage>}
 */
const createMessageMapper = (resolve) => async ({ content, user, ...restMessage }) => ({
  ...restMessage,
  content: await resolve(content).then((result) => {
    return {
      ...result,
      data: result.data.replace(/\\@/, '@')
    };
  }),
  user: await resolve(user),
});

module.exports = createMessageMapper
