// @ts-check

/**
 * if url guess url from global.location
 * @param {String|null} url
 */
const parseUrl = (url) => {
  if (!url && global.location) {
    return global.location.protocol + '//' + global.location.host
  }
  return url;
}

/**
 * No publisher function
 */
const noPublisher = () => { throw new Error('CuserClient: options.url must be defined to enable publisher capabilities') };

module.exports = {
  parseUrl,
  noPublisher,
}