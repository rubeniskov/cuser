export = messageIterator;
declare function messageIterator(resolve: any, opts: any): {
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
