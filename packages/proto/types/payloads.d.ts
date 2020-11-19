import { GraphMessage } from './graphs';
import { Writer, Reader } from 'protobufjs/minimal';
export interface PayloadUser {
    peerId: string;
    username: string;
    avatar: string;
}
export interface PayloadContent {
    data: string;
}
export interface PayloadPublishMessage {
    topicId: string;
    content: PayloadContent | undefined;
    user: PayloadUser | undefined;
}
export interface PayloadUpdateMessage {
    topicId: string;
    messageId: string;
    content: PayloadContent | undefined;
    user: PayloadUser | undefined;
}
export interface PayloadDeleteMessage {
    topicId: string;
    messageId: string;
    user: PayloadUser | undefined;
}
export interface PayloadQueryMessages {
    topicId: string;
    first: number | undefined;
    last: number | undefined;
    after: number | undefined;
    offset: number | undefined;
}
export interface PayloadQueryMessagesResult {
    messages: GraphMessage[];
}
export declare const protobufPackage = "cuser.payloads";
export declare const PayloadUser: {
    encode(message: PayloadUser, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): PayloadUser;
    fromJSON(object: any): PayloadUser;
    fromPartial(object: DeepPartial<PayloadUser>): PayloadUser;
    toJSON(message: PayloadUser): unknown;
};
export declare const PayloadContent: {
    encode(message: PayloadContent, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): PayloadContent;
    fromJSON(object: any): PayloadContent;
    fromPartial(object: DeepPartial<PayloadContent>): PayloadContent;
    toJSON(message: PayloadContent): unknown;
};
export declare const PayloadPublishMessage: {
    encode(message: PayloadPublishMessage, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): PayloadPublishMessage;
    fromJSON(object: any): PayloadPublishMessage;
    fromPartial(object: DeepPartial<PayloadPublishMessage>): PayloadPublishMessage;
    toJSON(message: PayloadPublishMessage): unknown;
};
export declare const PayloadUpdateMessage: {
    encode(message: PayloadUpdateMessage, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): PayloadUpdateMessage;
    fromJSON(object: any): PayloadUpdateMessage;
    fromPartial(object: DeepPartial<PayloadUpdateMessage>): PayloadUpdateMessage;
    toJSON(message: PayloadUpdateMessage): unknown;
};
export declare const PayloadDeleteMessage: {
    encode(message: PayloadDeleteMessage, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): PayloadDeleteMessage;
    fromJSON(object: any): PayloadDeleteMessage;
    fromPartial(object: DeepPartial<PayloadDeleteMessage>): PayloadDeleteMessage;
    toJSON(message: PayloadDeleteMessage): unknown;
};
export declare const PayloadQueryMessages: {
    encode(message: PayloadQueryMessages, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): PayloadQueryMessages;
    fromJSON(object: any): PayloadQueryMessages;
    fromPartial(object: DeepPartial<PayloadQueryMessages>): PayloadQueryMessages;
    toJSON(message: PayloadQueryMessages): unknown;
};
export declare const PayloadQueryMessagesResult: {
    encode(message: PayloadQueryMessagesResult, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): PayloadQueryMessagesResult;
    fromJSON(object: any): PayloadQueryMessagesResult;
    fromPartial(object: DeepPartial<PayloadQueryMessagesResult>): PayloadQueryMessagesResult;
    toJSON(message: PayloadQueryMessagesResult): unknown;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
