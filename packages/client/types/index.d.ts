export = CuserClient;
/**
 * test
 */
declare class CuserClient {
    constructor(node: any, opts: any);
    _node: any;
    _fetcher: (url: any, opts: any) => Promise<any>;
    _url: any;
    getMessages(topicId: any, limit?: number, offset?: number): Promise<any>;
    publishMessage(topicId: any, accessToken: any, content: any): Promise<any>;
    updateMessage(topicId: any, accessToken: any, content: any): Promise<void>;
    deleteMessage(topicId: any, accessToken: any, content: any): Promise<void>;
    subscribe(topicId: any, listener: any): () => void;
    authenticate(payload: any): Promise<any>;
}
declare namespace CuserClient {
    function createClient(node: any, opts: any): CuserClient;
}
