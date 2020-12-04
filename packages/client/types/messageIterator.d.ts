export = messageIterator;
declare function messageIterator(resolve: any, root: any, { limit, key, skip, map }?: {
    limit?: number;
    key?: string;
    skip?: number;
    map?: (v: any, k: any) => any;
}): {
    [Symbol.asyncIterator](): {
        next(): Promise<{
            done: boolean;
            value: any;
        } | {
            done: boolean;
            value?: undefined;
        }>;
    };
};
