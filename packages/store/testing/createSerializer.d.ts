export = createSerializer;
declare function createSerializer(cache?: {}, wrap?: (a: any) => any): {
    cache: {};
    serialize: (data: any) => any;
    serializable: (state: any) => boolean;
    deserialize: (hash: any) => any;
    deserializable: (state: any) => boolean;
};
