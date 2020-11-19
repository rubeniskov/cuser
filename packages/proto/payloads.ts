/* eslint-disable */
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

const basePayloadUser: object = {
  peerId: "",
  username: "",
  avatar: "",
};

const basePayloadContent: object = {
  data: "",
};

const basePayloadPublishMessage: object = {
  topicId: "",
};

const basePayloadUpdateMessage: object = {
  topicId: "",
  messageId: "",
};

const basePayloadDeleteMessage: object = {
  topicId: "",
  messageId: "",
};

const basePayloadQueryMessages: object = {
  topicId: "",
};

const basePayloadQueryMessagesResult: object = {
};

export const protobufPackage = 'cuser.payloads'

export const PayloadUser = {
  encode(message: PayloadUser, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.peerId);
    writer.uint32(18).string(message.username);
    writer.uint32(26).string(message.avatar);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PayloadUser {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePayloadUser } as PayloadUser;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.peerId = reader.string();
          break;
        case 2:
          message.username = reader.string();
          break;
        case 3:
          message.avatar = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PayloadUser {
    const message = { ...basePayloadUser } as PayloadUser;
    if (object.peerId !== undefined && object.peerId !== null) {
      message.peerId = String(object.peerId);
    } else {
      message.peerId = "";
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.avatar !== undefined && object.avatar !== null) {
      message.avatar = String(object.avatar);
    } else {
      message.avatar = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<PayloadUser>): PayloadUser {
    const message = { ...basePayloadUser } as PayloadUser;
    if (object.peerId !== undefined && object.peerId !== null) {
      message.peerId = object.peerId;
    } else {
      message.peerId = "";
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.avatar !== undefined && object.avatar !== null) {
      message.avatar = object.avatar;
    } else {
      message.avatar = "";
    }
    return message;
  },
  toJSON(message: PayloadUser): unknown {
    const obj: any = {};
    message.peerId !== undefined && (obj.peerId = message.peerId);
    message.username !== undefined && (obj.username = message.username);
    message.avatar !== undefined && (obj.avatar = message.avatar);
    return obj;
  },
};

export const PayloadContent = {
  encode(message: PayloadContent, writer: Writer = Writer.create()): Writer {
    writer.uint32(18).string(message.data);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PayloadContent {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePayloadContent } as PayloadContent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.data = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PayloadContent {
    const message = { ...basePayloadContent } as PayloadContent;
    if (object.data !== undefined && object.data !== null) {
      message.data = String(object.data);
    } else {
      message.data = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<PayloadContent>): PayloadContent {
    const message = { ...basePayloadContent } as PayloadContent;
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = "";
    }
    return message;
  },
  toJSON(message: PayloadContent): unknown {
    const obj: any = {};
    message.data !== undefined && (obj.data = message.data);
    return obj;
  },
};

export const PayloadPublishMessage = {
  encode(message: PayloadPublishMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.topicId);
    if (message.content !== undefined && message.content !== undefined) {
      PayloadContent.encode(message.content, writer.uint32(18).fork()).ldelim();
    }
    if (message.user !== undefined && message.user !== undefined) {
      PayloadUser.encode(message.user, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PayloadPublishMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePayloadPublishMessage } as PayloadPublishMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topicId = reader.string();
          break;
        case 2:
          message.content = PayloadContent.decode(reader, reader.uint32());
          break;
        case 3:
          message.user = PayloadUser.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PayloadPublishMessage {
    const message = { ...basePayloadPublishMessage } as PayloadPublishMessage;
    if (object.topicId !== undefined && object.topicId !== null) {
      message.topicId = String(object.topicId);
    } else {
      message.topicId = "";
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = PayloadContent.fromJSON(object.content);
    } else {
      message.content = undefined;
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = PayloadUser.fromJSON(object.user);
    } else {
      message.user = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PayloadPublishMessage>): PayloadPublishMessage {
    const message = { ...basePayloadPublishMessage } as PayloadPublishMessage;
    if (object.topicId !== undefined && object.topicId !== null) {
      message.topicId = object.topicId;
    } else {
      message.topicId = "";
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = PayloadContent.fromPartial(object.content);
    } else {
      message.content = undefined;
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = PayloadUser.fromPartial(object.user);
    } else {
      message.user = undefined;
    }
    return message;
  },
  toJSON(message: PayloadPublishMessage): unknown {
    const obj: any = {};
    message.topicId !== undefined && (obj.topicId = message.topicId);
    message.content !== undefined && (obj.content = message.content ? PayloadContent.toJSON(message.content) : undefined);
    message.user !== undefined && (obj.user = message.user ? PayloadUser.toJSON(message.user) : undefined);
    return obj;
  },
};

export const PayloadUpdateMessage = {
  encode(message: PayloadUpdateMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.topicId);
    writer.uint32(18).string(message.messageId);
    if (message.content !== undefined && message.content !== undefined) {
      PayloadContent.encode(message.content, writer.uint32(26).fork()).ldelim();
    }
    if (message.user !== undefined && message.user !== undefined) {
      PayloadUser.encode(message.user, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PayloadUpdateMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePayloadUpdateMessage } as PayloadUpdateMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topicId = reader.string();
          break;
        case 2:
          message.messageId = reader.string();
          break;
        case 3:
          message.content = PayloadContent.decode(reader, reader.uint32());
          break;
        case 4:
          message.user = PayloadUser.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PayloadUpdateMessage {
    const message = { ...basePayloadUpdateMessage } as PayloadUpdateMessage;
    if (object.topicId !== undefined && object.topicId !== null) {
      message.topicId = String(object.topicId);
    } else {
      message.topicId = "";
    }
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = String(object.messageId);
    } else {
      message.messageId = "";
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = PayloadContent.fromJSON(object.content);
    } else {
      message.content = undefined;
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = PayloadUser.fromJSON(object.user);
    } else {
      message.user = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PayloadUpdateMessage>): PayloadUpdateMessage {
    const message = { ...basePayloadUpdateMessage } as PayloadUpdateMessage;
    if (object.topicId !== undefined && object.topicId !== null) {
      message.topicId = object.topicId;
    } else {
      message.topicId = "";
    }
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = object.messageId;
    } else {
      message.messageId = "";
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = PayloadContent.fromPartial(object.content);
    } else {
      message.content = undefined;
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = PayloadUser.fromPartial(object.user);
    } else {
      message.user = undefined;
    }
    return message;
  },
  toJSON(message: PayloadUpdateMessage): unknown {
    const obj: any = {};
    message.topicId !== undefined && (obj.topicId = message.topicId);
    message.messageId !== undefined && (obj.messageId = message.messageId);
    message.content !== undefined && (obj.content = message.content ? PayloadContent.toJSON(message.content) : undefined);
    message.user !== undefined && (obj.user = message.user ? PayloadUser.toJSON(message.user) : undefined);
    return obj;
  },
};

export const PayloadDeleteMessage = {
  encode(message: PayloadDeleteMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.topicId);
    writer.uint32(18).string(message.messageId);
    if (message.user !== undefined && message.user !== undefined) {
      PayloadUser.encode(message.user, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PayloadDeleteMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePayloadDeleteMessage } as PayloadDeleteMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topicId = reader.string();
          break;
        case 2:
          message.messageId = reader.string();
          break;
        case 3:
          message.user = PayloadUser.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PayloadDeleteMessage {
    const message = { ...basePayloadDeleteMessage } as PayloadDeleteMessage;
    if (object.topicId !== undefined && object.topicId !== null) {
      message.topicId = String(object.topicId);
    } else {
      message.topicId = "";
    }
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = String(object.messageId);
    } else {
      message.messageId = "";
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = PayloadUser.fromJSON(object.user);
    } else {
      message.user = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PayloadDeleteMessage>): PayloadDeleteMessage {
    const message = { ...basePayloadDeleteMessage } as PayloadDeleteMessage;
    if (object.topicId !== undefined && object.topicId !== null) {
      message.topicId = object.topicId;
    } else {
      message.topicId = "";
    }
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = object.messageId;
    } else {
      message.messageId = "";
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = PayloadUser.fromPartial(object.user);
    } else {
      message.user = undefined;
    }
    return message;
  },
  toJSON(message: PayloadDeleteMessage): unknown {
    const obj: any = {};
    message.topicId !== undefined && (obj.topicId = message.topicId);
    message.messageId !== undefined && (obj.messageId = message.messageId);
    message.user !== undefined && (obj.user = message.user ? PayloadUser.toJSON(message.user) : undefined);
    return obj;
  },
};

export const PayloadQueryMessages = {
  encode(message: PayloadQueryMessages, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.topicId);
    if (message.first !== undefined) {
      writer.uint32(16).int32(message.first);
    }
    if (message.last !== undefined) {
      writer.uint32(24).int32(message.last);
    }
    if (message.after !== undefined) {
      writer.uint32(32).int32(message.after);
    }
    if (message.offset !== undefined) {
      writer.uint32(40).int32(message.offset);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PayloadQueryMessages {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePayloadQueryMessages } as PayloadQueryMessages;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topicId = reader.string();
          break;
        case 2:
          message.first = reader.int32();
          break;
        case 3:
          message.last = reader.int32();
          break;
        case 4:
          message.after = reader.int32();
          break;
        case 5:
          message.offset = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PayloadQueryMessages {
    const message = { ...basePayloadQueryMessages } as PayloadQueryMessages;
    if (object.topicId !== undefined && object.topicId !== null) {
      message.topicId = String(object.topicId);
    } else {
      message.topicId = "";
    }
    if (object.first !== undefined && object.first !== null) {
      message.first = Number(object.first);
    } else {
      message.first = undefined;
    }
    if (object.last !== undefined && object.last !== null) {
      message.last = Number(object.last);
    } else {
      message.last = undefined;
    }
    if (object.after !== undefined && object.after !== null) {
      message.after = Number(object.after);
    } else {
      message.after = undefined;
    }
    if (object.offset !== undefined && object.offset !== null) {
      message.offset = Number(object.offset);
    } else {
      message.offset = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PayloadQueryMessages>): PayloadQueryMessages {
    const message = { ...basePayloadQueryMessages } as PayloadQueryMessages;
    if (object.topicId !== undefined && object.topicId !== null) {
      message.topicId = object.topicId;
    } else {
      message.topicId = "";
    }
    if (object.first !== undefined && object.first !== null) {
      message.first = object.first;
    } else {
      message.first = undefined;
    }
    if (object.last !== undefined && object.last !== null) {
      message.last = object.last;
    } else {
      message.last = undefined;
    }
    if (object.after !== undefined && object.after !== null) {
      message.after = object.after;
    } else {
      message.after = undefined;
    }
    if (object.offset !== undefined && object.offset !== null) {
      message.offset = object.offset;
    } else {
      message.offset = undefined;
    }
    return message;
  },
  toJSON(message: PayloadQueryMessages): unknown {
    const obj: any = {};
    message.topicId !== undefined && (obj.topicId = message.topicId);
    message.first !== undefined && (obj.first = message.first);
    message.last !== undefined && (obj.last = message.last);
    message.after !== undefined && (obj.after = message.after);
    message.offset !== undefined && (obj.offset = message.offset);
    return obj;
  },
};

export const PayloadQueryMessagesResult = {
  encode(message: PayloadQueryMessagesResult, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      GraphMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PayloadQueryMessagesResult {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePayloadQueryMessagesResult } as PayloadQueryMessagesResult;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(GraphMessage.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PayloadQueryMessagesResult {
    const message = { ...basePayloadQueryMessagesResult } as PayloadQueryMessagesResult;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(GraphMessage.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<PayloadQueryMessagesResult>): PayloadQueryMessagesResult {
    const message = { ...basePayloadQueryMessagesResult } as PayloadQueryMessagesResult;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(GraphMessage.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: PayloadQueryMessagesResult): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map(e => e ? GraphMessage.toJSON(e) : undefined);
    } else {
      obj.messages = [];
    }
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