/* eslint-disable */
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
  topics: { [key: string]: GraphTopic };
}

export interface GraphRoot_TopicsEntry {
  key: string;
  value: GraphTopic | undefined;
}

const baseGraphUser: object = {
  type: 0,
  peerId: "",
  username: "",
  avatar: "",
};

const baseGraphContent: object = {
  type: 0,
  parent: "",
  revision: 0,
  cdate: 0,
};

const baseGraphMessage: object = {
  type: 0,
  id: "",
  parent: "",
  cdate: 0,
  mdate: 0,
};

const baseGraphTopic: object = {
  type: 0,
  count: 0,
};

const baseGraphRoot: object = {
  type: 0,
};

const baseGraphRoot_TopicsEntry: object = {
  key: "",
};

export const protobufPackage = 'cuser.graphs'

export enum GraphType {
  GRAPH_ROOT = 0,
  GRAPH_TOPIC = 1,
  GRAPH_USER = 2,
  GRAPH_CONTENT = 3,
  GRAPH_MESSAGE = 4,
  UNRECOGNIZED = -1,
}

export function graphTypeFromJSON(object: any): GraphType {
  switch (object) {
    case 0:
    case "GRAPH_ROOT":
      return GraphType.GRAPH_ROOT;
    case 1:
    case "GRAPH_TOPIC":
      return GraphType.GRAPH_TOPIC;
    case 2:
    case "GRAPH_USER":
      return GraphType.GRAPH_USER;
    case 3:
    case "GRAPH_CONTENT":
      return GraphType.GRAPH_CONTENT;
    case 4:
    case "GRAPH_MESSAGE":
      return GraphType.GRAPH_MESSAGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GraphType.UNRECOGNIZED;
  }
}

export function graphTypeToJSON(object: GraphType): string {
  switch (object) {
    case GraphType.GRAPH_ROOT:
      return "GRAPH_ROOT";
    case GraphType.GRAPH_TOPIC:
      return "GRAPH_TOPIC";
    case GraphType.GRAPH_USER:
      return "GRAPH_USER";
    case GraphType.GRAPH_CONTENT:
      return "GRAPH_CONTENT";
    case GraphType.GRAPH_MESSAGE:
      return "GRAPH_MESSAGE";
    default:
      return "UNKNOWN";
  }
}

export const GraphUser = {
  encode(message: GraphUser, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.type);
    writer.uint32(18).string(message.peerId);
    writer.uint32(26).string(message.username);
    writer.uint32(34).string(message.avatar);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): GraphUser {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGraphUser } as GraphUser;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.peerId = reader.string();
          break;
        case 3:
          message.username = reader.string();
          break;
        case 4:
          message.avatar = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GraphUser {
    const message = { ...baseGraphUser } as GraphUser;
    if (object.type !== undefined && object.type !== null) {
      message.type = graphTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
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
  fromPartial(object: DeepPartial<GraphUser>): GraphUser {
    const message = { ...baseGraphUser } as GraphUser;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
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
  toJSON(message: GraphUser): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = graphTypeToJSON(message.type));
    message.peerId !== undefined && (obj.peerId = message.peerId);
    message.username !== undefined && (obj.username = message.username);
    message.avatar !== undefined && (obj.avatar = message.avatar);
    return obj;
  },
};

export const GraphContent = {
  encode(message: GraphContent, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.type);
    writer.uint32(18).string(message.parent);
    writer.uint32(24).int32(message.revision);
    writer.uint32(34).bytes(message.data);
    writer.uint32(40).int32(message.cdate);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): GraphContent {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGraphContent } as GraphContent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.parent = reader.string();
          break;
        case 3:
          message.revision = reader.int32();
          break;
        case 4:
          message.data = reader.bytes();
          break;
        case 5:
          message.cdate = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GraphContent {
    const message = { ...baseGraphContent } as GraphContent;
    if (object.type !== undefined && object.type !== null) {
      message.type = graphTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.parent !== undefined && object.parent !== null) {
      message.parent = String(object.parent);
    } else {
      message.parent = "";
    }
    if (object.revision !== undefined && object.revision !== null) {
      message.revision = Number(object.revision);
    } else {
      message.revision = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.cdate !== undefined && object.cdate !== null) {
      message.cdate = Number(object.cdate);
    } else {
      message.cdate = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GraphContent>): GraphContent {
    const message = { ...baseGraphContent } as GraphContent;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.parent !== undefined && object.parent !== null) {
      message.parent = object.parent;
    } else {
      message.parent = "";
    }
    if (object.revision !== undefined && object.revision !== null) {
      message.revision = object.revision;
    } else {
      message.revision = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    if (object.cdate !== undefined && object.cdate !== null) {
      message.cdate = object.cdate;
    } else {
      message.cdate = 0;
    }
    return message;
  },
  toJSON(message: GraphContent): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = graphTypeToJSON(message.type));
    message.parent !== undefined && (obj.parent = message.parent);
    message.revision !== undefined && (obj.revision = message.revision);
    message.data !== undefined && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.cdate !== undefined && (obj.cdate = message.cdate);
    return obj;
  },
};

export const GraphMessage = {
  encode(message: GraphMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.type);
    writer.uint32(18).string(message.id);
    writer.uint32(26).string(message.parent);
    if (message.content !== undefined && message.content !== undefined) {
      GraphContent.encode(message.content, writer.uint32(34).fork()).ldelim();
    }
    if (message.user !== undefined && message.user !== undefined) {
      GraphUser.encode(message.user, writer.uint32(42).fork()).ldelim();
    }
    writer.uint32(48).int32(message.cdate);
    writer.uint32(56).int32(message.mdate);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): GraphMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGraphMessage } as GraphMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.parent = reader.string();
          break;
        case 4:
          message.content = GraphContent.decode(reader, reader.uint32());
          break;
        case 5:
          message.user = GraphUser.decode(reader, reader.uint32());
          break;
        case 6:
          message.cdate = reader.int32();
          break;
        case 7:
          message.mdate = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GraphMessage {
    const message = { ...baseGraphMessage } as GraphMessage;
    if (object.type !== undefined && object.type !== null) {
      message.type = graphTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.parent !== undefined && object.parent !== null) {
      message.parent = String(object.parent);
    } else {
      message.parent = "";
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = GraphContent.fromJSON(object.content);
    } else {
      message.content = undefined;
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = GraphUser.fromJSON(object.user);
    } else {
      message.user = undefined;
    }
    if (object.cdate !== undefined && object.cdate !== null) {
      message.cdate = Number(object.cdate);
    } else {
      message.cdate = 0;
    }
    if (object.mdate !== undefined && object.mdate !== null) {
      message.mdate = Number(object.mdate);
    } else {
      message.mdate = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GraphMessage>): GraphMessage {
    const message = { ...baseGraphMessage } as GraphMessage;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.parent !== undefined && object.parent !== null) {
      message.parent = object.parent;
    } else {
      message.parent = "";
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = GraphContent.fromPartial(object.content);
    } else {
      message.content = undefined;
    }
    if (object.user !== undefined && object.user !== null) {
      message.user = GraphUser.fromPartial(object.user);
    } else {
      message.user = undefined;
    }
    if (object.cdate !== undefined && object.cdate !== null) {
      message.cdate = object.cdate;
    } else {
      message.cdate = 0;
    }
    if (object.mdate !== undefined && object.mdate !== null) {
      message.mdate = object.mdate;
    } else {
      message.mdate = 0;
    }
    return message;
  },
  toJSON(message: GraphMessage): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = graphTypeToJSON(message.type));
    message.id !== undefined && (obj.id = message.id);
    message.parent !== undefined && (obj.parent = message.parent);
    message.content !== undefined && (obj.content = message.content ? GraphContent.toJSON(message.content) : undefined);
    message.user !== undefined && (obj.user = message.user ? GraphUser.toJSON(message.user) : undefined);
    message.cdate !== undefined && (obj.cdate = message.cdate);
    message.mdate !== undefined && (obj.mdate = message.mdate);
    return obj;
  },
};

export const GraphTopic = {
  encode(message: GraphTopic, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.type);
    if (message.message !== undefined && message.message !== undefined) {
      GraphMessage.encode(message.message, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(24).int32(message.count);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): GraphTopic {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGraphTopic } as GraphTopic;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.message = GraphMessage.decode(reader, reader.uint32());
          break;
        case 3:
          message.count = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GraphTopic {
    const message = { ...baseGraphTopic } as GraphTopic;
    if (object.type !== undefined && object.type !== null) {
      message.type = graphTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = GraphMessage.fromJSON(object.message);
    } else {
      message.message = undefined;
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = Number(object.count);
    } else {
      message.count = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GraphTopic>): GraphTopic {
    const message = { ...baseGraphTopic } as GraphTopic;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = GraphMessage.fromPartial(object.message);
    } else {
      message.message = undefined;
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = object.count;
    } else {
      message.count = 0;
    }
    return message;
  },
  toJSON(message: GraphTopic): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = graphTypeToJSON(message.type));
    message.message !== undefined && (obj.message = message.message ? GraphMessage.toJSON(message.message) : undefined);
    message.count !== undefined && (obj.count = message.count);
    return obj;
  },
};

export const GraphRoot = {
  encode(message: GraphRoot, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.type);
    Object.entries(message.topics).forEach(([key, value]) => {
      GraphRoot_TopicsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    })
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): GraphRoot {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGraphRoot } as GraphRoot;
    message.topics = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          const entry2 = GraphRoot_TopicsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.topics[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GraphRoot {
    const message = { ...baseGraphRoot } as GraphRoot;
    message.topics = {};
    if (object.type !== undefined && object.type !== null) {
      message.type = graphTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.topics !== undefined && object.topics !== null) {
      Object.entries(object.topics).forEach(([key, value]) => {
        message.topics[key] = GraphTopic.fromJSON(value);
      })
    }
    return message;
  },
  fromPartial(object: DeepPartial<GraphRoot>): GraphRoot {
    const message = { ...baseGraphRoot } as GraphRoot;
    message.topics = {};
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.topics !== undefined && object.topics !== null) {
      Object.entries(object.topics).forEach(([key, value]) => {
        if (value !== undefined) {
          message.topics[key] = GraphTopic.fromPartial(value);
        }
      })
    }
    return message;
  },
  toJSON(message: GraphRoot): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = graphTypeToJSON(message.type));
    obj.topics = {};
    if (message.topics) {
      Object.entries(message.topics).forEach(([k, v]) => {
        obj.topics[k] = GraphTopic.toJSON(v);
      })
    }
    return obj;
  },
};

export const GraphRoot_TopicsEntry = {
  encode(message: GraphRoot_TopicsEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    if (message.value !== undefined && message.value !== undefined) {
      GraphTopic.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): GraphRoot_TopicsEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGraphRoot_TopicsEntry } as GraphRoot_TopicsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = GraphTopic.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GraphRoot_TopicsEntry {
    const message = { ...baseGraphRoot_TopicsEntry } as GraphRoot_TopicsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = GraphTopic.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GraphRoot_TopicsEntry>): GraphRoot_TopicsEntry {
    const message = { ...baseGraphRoot_TopicsEntry } as GraphRoot_TopicsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = GraphTopic.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
  toJSON(message: GraphRoot_TopicsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? GraphTopic.toJSON(message.value) : undefined);
    return obj;
  },
};

interface WindowBase64 {
  atob(b64: string): string;
  btoa(bin: string): string;
}

const windowBase64 = (globalThis as unknown as WindowBase64);
const atob = windowBase64.atob || ((b64: string) => Buffer.from(b64, 'base64').toString('binary'));
const btoa = windowBase64.btoa || ((bin: string) => Buffer.from(bin, 'binary').toString('base64'));

function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(''));
}
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