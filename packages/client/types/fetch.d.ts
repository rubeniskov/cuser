export = fetcher;
/**
 * Fetcher interface
 *
 * @param {String} url
 * @param {Object} opts
 * @returns {Promise}
 */
declare function fetcher(url: string, opts: any): Promise<any>;
declare namespace fetcher {
    export { defaults, fetch };
}
declare namespace defaults {
    const headers: {
        'Content-Type': string;
    };
    const redirect: string;
    const cache: string;
}
type fetch = any;
