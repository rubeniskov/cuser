// @ts-check

/**
 * if url guess url from global.location
 * @param {{ address: String, port: Number }|null} url
 */
const parseUrl = (url) => {
  const { address, port } = url || {
    address: global.location.host,
    port: global.location.protocol === 'https:' ? 443 : 80
  };

  return `http${port === 443 ? 's' : ''}://${address}`;
}

/**
 * No publisher function
 */
const noPublisher = () => { throw new Error('CuserClient: options.url must be defined to enable publisher capabilities') };

module.exports = {
  parseUrl,
  noPublisher,
}
