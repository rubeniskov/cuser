// @ts-check
/**
 *
 * @param {string | Array<string | any>} mapping
 * @returns {Array<string | any>}
 */
const parseMapping = (mapping) => Array.isArray(mapping) ? mapping : [mapping];

module.exports = parseMapping;
