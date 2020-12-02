/** @typedef {import('node-fetch').Op} */
const fetch = global.fetch || require('node-' + 'fetch');


const defaults = {
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  cache: 'no-cache',
}

/**
 * Fetcher interface
 *
 * @param {String} url
 * @param {Object} opts
 * @returns {Promise}
 */
const fetcher = (url, opts) => fetch(url, {
  ...opts,
  ...defaults,
}).then((response) => {
  if (response.status < 400) {
    return response.json();
  }
  return response.json().then((err) => Promise.reject(err));
});

module.exports = fetcher;
module.exports.defaults = defaults;
