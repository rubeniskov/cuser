export = createTestReducer;
declare function createTestReducer(state: any): {
    id: any;
    user: {
        peerId: any;
        username: any;
        avatar: any;
    };
    parent: any;
    content: {
        parent: any;
        data: any;
    };
};
