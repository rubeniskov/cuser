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
    export { defaults };
}
declare namespace defaults {
    const headers: {
        'Content-Type': string;
    };
    const redirect: string;
    const cache: string;
}
