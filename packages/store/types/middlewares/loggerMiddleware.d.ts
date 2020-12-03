export = loggerMiddleware;
declare function loggerMiddleware(store: any): (next: any) => (action: any) => any;
