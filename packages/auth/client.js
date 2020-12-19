/** @typedef {import('@cuser/core').CuserCore} CuserCore */

const { decode } = require('@cuser/crypto/bearer');

class CuserAuthClient {
  /**
   * @param {CuserCore} core
   * @param {Object} [opts]
   */
  constructor(core, opts) {
    /** @type {CuserCore} */
    this._core = core;
    this._options = opts;
  }

  async decode(accessToken) {
    if (typeof accessToken !== 'string') {
      throw new Error(`CuserAuthClient: accessToken must be a string`);
    }
    return decode(accessToken, this._options);
  }
}

/**
 * @param {CuserCore} core
 * @param {Object} [opts]
 */
const createAuthClient = (core, opts) => new CuserAuthClient(core, opts);

module.exports = createAuthClient;
module.exports.CuserAuthClient = CuserAuthClient;
