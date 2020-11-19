import { PayloadPublishMessage, PayloadUpdateMessage, PayloadDeleteMessage } from './payloads';
import { Writer, Reader } from 'protobufjs/minimal';
export interface ActionPublishMessage {
    type: ActionType;
    payload: PayloadPublishMessage | undefined;
}
export interface ActionUpdateMessage {
    type: ActionType;
    payload: PayloadUpdateMessage | undefined;
}
export interface ActionDeleteMessage {
    type: ActionType;
    payload: PayloadDeleteMessage | undefined;
}
export declare const protobufPackage = "cuser.actions";
export declare enum ActionType {
    ACTION_PUBLISH_MESSAGE = 0,
    ACTION_UPDATE_MESSAGE = 1,
    ACTION_DELETE_MESSAGE = 2,
    UNRECOGNIZED = -1
}
export declare function actionTypeFromJSON(object: any): ActionType;
export declare function actionTypeToJSON(object: ActionType): string;
export declare const ActionPublishMessage: {
    encode(message: ActionPublishMessage, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): ActionPublishMessage;
    fromJSON(object: any): ActionPublishMessage;
    fromPartial(object: DeepPartial<ActionPublishMessage>): ActionPublishMessage;
    toJSON(message: ActionPublishMessage): unknown;
};
export declare const ActionUpdateMessage: {
    encode(message: ActionUpdateMessage, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): ActionUpdateMessage;
    fromJSON(object: any): ActionUpdateMessage;
    fromPartial(object: DeepPartial<ActionUpdateMessage>): ActionUpdateMessage;
    toJSON(message: ActionUpdateMessage): unknown;
};
export declare const ActionDeleteMessage: {
    encode(message: ActionDeleteMessage, writer?: Writer): Writer;
    decode(input: Uint8Array | Reader, length?: number): ActionDeleteMessage;
    fromJSON(object: any): ActionDeleteMessage;
    fromPartial(object: DeepPartial<ActionDeleteMessage>): ActionDeleteMessage;
    toJSON(message: ActionDeleteMessage): unknown;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
