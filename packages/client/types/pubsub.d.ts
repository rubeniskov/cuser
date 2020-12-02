export = createPubSub;
declare function createPubSub(node: any, opts: any): {
    /**
     * @param {String} topicId
     * @param {Object} payload
     */
    broadcast: (topicId: string, payload: any) => void;
    subscribe: (topicId: any, subscriber: any) => () => any;
};
