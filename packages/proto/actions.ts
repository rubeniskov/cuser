/* eslint-disable */
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

const baseActionPublishMessage: object = {
  type: 0,
};

const baseActionUpdateMessage: object = {
  type: 0,
};

const baseActionDeleteMessage: object = {
  type: 0,
};

export const protobufPackage = 'cuser.actions'

export enum ActionType {
  ACTION_PUBLISH_MESSAGE = 0,
  ACTION_UPDATE_MESSAGE = 1,
  ACTION_DELETE_MESSAGE = 2,
  UNRECOGNIZED = -1,
}

export function actionTypeFromJSON(object: any): ActionType {
  switch (object) {
    case 0:
    case "ACTION_PUBLISH_MESSAGE":
      return ActionType.ACTION_PUBLISH_MESSAGE;
    case 1:
    case "ACTION_UPDATE_MESSAGE":
      return ActionType.ACTION_UPDATE_MESSAGE;
    case 2:
    case "ACTION_DELETE_MESSAGE":
      return ActionType.ACTION_DELETE_MESSAGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ActionType.UNRECOGNIZED;
  }
}

export function actionTypeToJSON(object: ActionType): string {
  switch (object) {
    case ActionType.ACTION_PUBLISH_MESSAGE:
      return "ACTION_PUBLISH_MESSAGE";
    case ActionType.ACTION_UPDATE_MESSAGE:
      return "ACTION_UPDATE_MESSAGE";
    case ActionType.ACTION_DELETE_MESSAGE:
      return "ACTION_DELETE_MESSAGE";
    default:
      return "UNKNOWN";
  }
}

export const ActionPublishMessage = {
  encode(message: ActionPublishMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.type);
    if (message.payload !== undefined && message.payload !== undefined) {
      PayloadPublishMessage.encode(message.payload, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ActionPublishMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseActionPublishMessage } as ActionPublishMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.payload = PayloadPublishMessage.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ActionPublishMessage {
    const message = { ...baseActionPublishMessage } as ActionPublishMessage;
    if (object.type !== undefined && object.type !== null) {
      message.type = actionTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = PayloadPublishMessage.fromJSON(object.payload);
    } else {
      message.payload = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ActionPublishMessage>): ActionPublishMessage {
    const message = { ...baseActionPublishMessage } as ActionPublishMessage;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = PayloadPublishMessage.fromPartial(object.payload);
    } else {
      message.payload = undefined;
    }
    return message;
  },
  toJSON(message: ActionPublishMessage): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = actionTypeToJSON(message.type));
    message.payload !== undefined && (obj.payload = message.payload ? PayloadPublishMessage.toJSON(message.payload) : undefined);
    return obj;
  },
};

export const ActionUpdateMessage = {
  encode(message: ActionUpdateMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.type);
    if (message.payload !== undefined && message.payload !== undefined) {
      PayloadUpdateMessage.encode(message.payload, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ActionUpdateMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseActionUpdateMessage } as ActionUpdateMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.payload = PayloadUpdateMessage.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ActionUpdateMessage {
    const message = { ...baseActionUpdateMessage } as ActionUpdateMessage;
    if (object.type !== undefined && object.type !== null) {
      message.type = actionTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = PayloadUpdateMessage.fromJSON(object.payload);
    } else {
      message.payload = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ActionUpdateMessage>): ActionUpdateMessage {
    const message = { ...baseActionUpdateMessage } as ActionUpdateMessage;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = PayloadUpdateMessage.fromPartial(object.payload);
    } else {
      message.payload = undefined;
    }
    return message;
  },
  toJSON(message: ActionUpdateMessage): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = actionTypeToJSON(message.type));
    message.payload !== undefined && (obj.payload = message.payload ? PayloadUpdateMessage.toJSON(message.payload) : undefined);
    return obj;
  },
};

export const ActionDeleteMessage = {
  encode(message: ActionDeleteMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.type);
    if (message.payload !== undefined && message.payload !== undefined) {
      PayloadDeleteMessage.encode(message.payload, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ActionDeleteMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseActionDeleteMessage } as ActionDeleteMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.payload = PayloadDeleteMessage.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ActionDeleteMessage {
    const message = { ...baseActionDeleteMessage } as ActionDeleteMessage;
    if (object.type !== undefined && object.type !== null) {
      message.type = actionTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = PayloadDeleteMessage.fromJSON(object.payload);
    } else {
      message.payload = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ActionDeleteMessage>): ActionDeleteMessage {
    const message = { ...baseActionDeleteMessage } as ActionDeleteMessage;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = PayloadDeleteMessage.fromPartial(object.payload);
    } else {
      message.payload = undefined;
    }
    return message;
  },
  toJSON(message: ActionDeleteMessage): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = actionTypeToJSON(message.type));
    message.payload !== undefined && (obj.payload = message.payload ? PayloadDeleteMessage.toJSON(message.payload) : undefined);
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;