import { Writer, Reader } from 'protobufjs/minimal';
export interface GraphUser {
    type: GraphType;
    /**
     *  Unique identification using CID
     */
    peerId: string;
    /**
     *  Username string
     */
    username: string;
    /**
     *  Image of the user ref with CID
     */
    avatar: string;
}
export interface GraphContent {
    type: GraphType;
    /**
     *  Parent content using CID
     */
    parent: string;
    /**
     *  Revision
     */
    revision: number;
    /**
     *  The data of the content
     */
    data: Uint8Array;
    /**
     *  Creation date
     */
    cdate: number;
}
export interface GraphMessage {
    type: GraphType;
    /**
     *  uuid
     */
    id: string;
    /**
     *  Parent message CID
     */
    parent: string;
    /**
     *  Content represented by CID
     */
    content: GraphContent | undefined;
    /**
     *  User represented by CID
     */
    user: GraphUser | undefined;
    /**
     *  Creation date
     */
    cdate: number;
    /**
     *  Modify date
     */
    mdate: number;
}
export interface GraphTopic {
    type: GraphType;
    message: GraphMessage | undefined;
    count: number;
}
export interface GraphRoot {
    type: GraphType;
    topics: {
        [key: string]: GraphTopic;
    };
}
export interface GraphRoot_TopicsEntry {
    key: string;
    value: GraphTopic | undefined;
}
export declare const protobufPackage = "cuser.graphs";
export declare enum GraphType {
    GRAPH_ROOT = 0,
    GRAPH_TOPIC = 1,
    GRAPH_USER = 2,
    GRAPH_CONTENT = 3,
    GRAPH_MESSAGE = 4,
    UNRECOGNIZED = -1
}
export declare function graphTypeFromJSON(object: any): GraphType;
export declare function graphTypeToJSON(object: GraphType): string;
export declare const GraphUser: {
    encode(message: GraphUser, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): GraphUser;
    fromJSON(object: any): GraphUser;
    fromPartial(object: DeepPartial<GraphUser>): GraphUser;
    toJSON(message: GraphUser): unknown;
};
export declare const GraphContent: {
    encode(message: GraphContent, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): GraphContent;
    fromJSON(object: any): GraphContent;
    fromPartial(object: DeepPartial<GraphContent>): GraphContent;
    toJSON(message: GraphContent): unknown;
};
export declare const GraphMessage: {
    encode(message: GraphMessage, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): GraphMessage;
    fromJSON(object: any): GraphMessage;
    fromPartial(object: DeepPartial<GraphMessage>): GraphMessage;
    toJSON(message: GraphMessage): unknown;
};
export declare const GraphTopic: {
    encode(message: GraphTopic, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): GraphTopic;
    fromJSON(object: any): GraphTopic;
    fromPartial(object: DeepPartial<GraphTopic>): GraphTopic;
    toJSON(message: GraphTopic): unknown;
};
export declare const GraphRoot: {
    encode(message: GraphRoot, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): GraphRoot;
    fromJSON(object: any): GraphRoot;
    fromPartial(object: DeepPartial<GraphRoot>): GraphRoot;
    toJSON(message: GraphRoot): unknown;
};
export declare const GraphRoot_TopicsEntry: {
    encode(message: GraphRoot_TopicsEntry, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): GraphRoot_TopicsEntry;
    fromJSON(object: any): GraphRoot_TopicsEntry;
    fromPartial(object: DeepPartial<GraphRoot_TopicsEntry>): GraphRoot_TopicsEntry;
    toJSON(message: GraphRoot_TopicsEntry): unknown;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
