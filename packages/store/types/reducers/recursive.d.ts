export = recursiveReducer;
declare function recursiveReducer(reducer: any, opts: any): (state: any, action: any, { resolve }?: {
    resolve?: (a: any, _: any) => any;
}) => any;
