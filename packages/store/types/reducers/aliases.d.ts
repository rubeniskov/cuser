export = aliases;
declare const aliases: {
    '@topics': (state: any, action: any, opts: any) => any;
    '@topic': (state: any, action: any, opts: any) => any;
    '@message': (state: any, action: any, opts: any) => any;
    '@user': (state: any, action: any, opts: any) => any;
    '@content': (state: any, action: any, opts: any) => any;
    '@data': (state: any, action: any, opts: any) => any;
    '@timestamp': () => any;
    '@revision': (state: number, action: any) => number;
    '@uuid': () => any;
};
