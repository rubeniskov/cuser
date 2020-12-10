export = createCypher;
declare function createCypher(opts: any): CuserCryptoCypher;
declare namespace createCypher {
    export { CuserCryptoCypher };
}
/**
 *
 */
declare class CuserCryptoCypher {
    constructor(secret: any);
    _cypher: any;
    _packer: any;
    encode(payload: any): any;
    decode(token: any): any;
}
