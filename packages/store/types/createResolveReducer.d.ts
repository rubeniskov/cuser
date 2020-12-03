export = createResolveReducer;
declare function createResolveReducer(rootReducer: any, { aliases, mapping, ...restOptions }?: {
    aliases?: {};
    mapping?: {};
}): (state: any, action: any) => any;
