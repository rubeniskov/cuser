export = createHash;
/**
 * Returns a 32 bytes fixed length hash from a secret word
 * @param {String} secret
 * @param {String} [encoding='buffer']
 */
declare function createHash(secret: string, encoding?: string): Buffer & string;
