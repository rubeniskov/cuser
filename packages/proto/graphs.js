"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.GraphRoot_TopicsEntry = exports.GraphRoot = exports.GraphTopic = exports.GraphMessage = exports.GraphContent = exports.GraphUser = exports.graphTypeToJSON = exports.graphTypeFromJSON = exports.GraphType = exports.protobufPackage = void 0;
/* eslint-disable */
var minimal_1 = require("protobufjs/minimal");
var baseGraphUser = {
    type: 0,
    peerId: "",
    username: "",
    avatar: ""
};
var baseGraphContent = {
    type: 0,
    parent: "",
    revision: 0,
    cdate: 0
};
var baseGraphMessage = {
    type: 0,
    id: "",
    parent: "",
    cdate: 0,
    mdate: 0
};
var baseGraphTopic = {
    type: 0,
    count: 0
};
var baseGraphRoot = {
    type: 0
};
var baseGraphRoot_TopicsEntry = {
    key: ""
};
exports.protobufPackage = 'cuser.graphs';
var GraphType;
(function (GraphType) {
    GraphType[GraphType["GRAPH_ROOT"] = 0] = "GRAPH_ROOT";
    GraphType[GraphType["GRAPH_TOPIC"] = 1] = "GRAPH_TOPIC";
    GraphType[GraphType["GRAPH_USER"] = 2] = "GRAPH_USER";
    GraphType[GraphType["GRAPH_CONTENT"] = 3] = "GRAPH_CONTENT";
    GraphType[GraphType["GRAPH_MESSAGE"] = 4] = "GRAPH_MESSAGE";
    GraphType[GraphType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(GraphType = exports.GraphType || (exports.GraphType = {}));
function graphTypeFromJSON(object) {
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
exports.graphTypeFromJSON = graphTypeFromJSON;
function graphTypeToJSON(object) {
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
exports.graphTypeToJSON = graphTypeToJSON;
exports.GraphUser = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(8).int32(message.type);
        writer.uint32(18).string(message.peerId);
        writer.uint32(26).string(message.username);
        writer.uint32(34).string(message.avatar);
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGraphUser);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
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
    fromJSON: function (object) {
        var message = __assign({}, baseGraphUser);
        if (object.type !== undefined && object.type !== null) {
            message.type = graphTypeFromJSON(object.type);
        }
        else {
            message.type = 0;
        }
        if (object.peerId !== undefined && object.peerId !== null) {
            message.peerId = String(object.peerId);
        }
        else {
            message.peerId = "";
        }
        if (object.username !== undefined && object.username !== null) {
            message.username = String(object.username);
        }
        else {
            message.username = "";
        }
        if (object.avatar !== undefined && object.avatar !== null) {
            message.avatar = String(object.avatar);
        }
        else {
            message.avatar = "";
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGraphUser);
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = 0;
        }
        if (object.peerId !== undefined && object.peerId !== null) {
            message.peerId = object.peerId;
        }
        else {
            message.peerId = "";
        }
        if (object.username !== undefined && object.username !== null) {
            message.username = object.username;
        }
        else {
            message.username = "";
        }
        if (object.avatar !== undefined && object.avatar !== null) {
            message.avatar = object.avatar;
        }
        else {
            message.avatar = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.type !== undefined && (obj.type = graphTypeToJSON(message.type));
        message.peerId !== undefined && (obj.peerId = message.peerId);
        message.username !== undefined && (obj.username = message.username);
        message.avatar !== undefined && (obj.avatar = message.avatar);
        return obj;
    }
};
exports.GraphContent = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(8).int32(message.type);
        writer.uint32(18).string(message.parent);
        writer.uint32(24).int32(message.revision);
        writer.uint32(34).bytes(message.data);
        writer.uint32(40).int32(message.cdate);
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGraphContent);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
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
    fromJSON: function (object) {
        var message = __assign({}, baseGraphContent);
        if (object.type !== undefined && object.type !== null) {
            message.type = graphTypeFromJSON(object.type);
        }
        else {
            message.type = 0;
        }
        if (object.parent !== undefined && object.parent !== null) {
            message.parent = String(object.parent);
        }
        else {
            message.parent = "";
        }
        if (object.revision !== undefined && object.revision !== null) {
            message.revision = Number(object.revision);
        }
        else {
            message.revision = 0;
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = bytesFromBase64(object.data);
        }
        if (object.cdate !== undefined && object.cdate !== null) {
            message.cdate = Number(object.cdate);
        }
        else {
            message.cdate = 0;
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGraphContent);
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = 0;
        }
        if (object.parent !== undefined && object.parent !== null) {
            message.parent = object.parent;
        }
        else {
            message.parent = "";
        }
        if (object.revision !== undefined && object.revision !== null) {
            message.revision = object.revision;
        }
        else {
            message.revision = 0;
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        else {
            message.data = new Uint8Array();
        }
        if (object.cdate !== undefined && object.cdate !== null) {
            message.cdate = object.cdate;
        }
        else {
            message.cdate = 0;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.type !== undefined && (obj.type = graphTypeToJSON(message.type));
        message.parent !== undefined && (obj.parent = message.parent);
        message.revision !== undefined && (obj.revision = message.revision);
        message.data !== undefined && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.cdate !== undefined && (obj.cdate = message.cdate);
        return obj;
    }
};
exports.GraphMessage = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(8).int32(message.type);
        writer.uint32(18).string(message.id);
        writer.uint32(26).string(message.parent);
        if (message.content !== undefined && message.content !== undefined) {
            exports.GraphContent.encode(message.content, writer.uint32(34).fork()).ldelim();
        }
        if (message.user !== undefined && message.user !== undefined) {
            exports.GraphUser.encode(message.user, writer.uint32(42).fork()).ldelim();
        }
        writer.uint32(48).int32(message.cdate);
        writer.uint32(56).int32(message.mdate);
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGraphMessage);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.parent = reader.string();
                    break;
                case 4:
                    message.content = exports.GraphContent.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.user = exports.GraphUser.decode(reader, reader.uint32());
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
    fromJSON: function (object) {
        var message = __assign({}, baseGraphMessage);
        if (object.type !== undefined && object.type !== null) {
            message.type = graphTypeFromJSON(object.type);
        }
        else {
            message.type = 0;
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.parent !== undefined && object.parent !== null) {
            message.parent = String(object.parent);
        }
        else {
            message.parent = "";
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = exports.GraphContent.fromJSON(object.content);
        }
        else {
            message.content = undefined;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = exports.GraphUser.fromJSON(object.user);
        }
        else {
            message.user = undefined;
        }
        if (object.cdate !== undefined && object.cdate !== null) {
            message.cdate = Number(object.cdate);
        }
        else {
            message.cdate = 0;
        }
        if (object.mdate !== undefined && object.mdate !== null) {
            message.mdate = Number(object.mdate);
        }
        else {
            message.mdate = 0;
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGraphMessage);
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = 0;
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.parent !== undefined && object.parent !== null) {
            message.parent = object.parent;
        }
        else {
            message.parent = "";
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = exports.GraphContent.fromPartial(object.content);
        }
        else {
            message.content = undefined;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = exports.GraphUser.fromPartial(object.user);
        }
        else {
            message.user = undefined;
        }
        if (object.cdate !== undefined && object.cdate !== null) {
            message.cdate = object.cdate;
        }
        else {
            message.cdate = 0;
        }
        if (object.mdate !== undefined && object.mdate !== null) {
            message.mdate = object.mdate;
        }
        else {
            message.mdate = 0;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.type !== undefined && (obj.type = graphTypeToJSON(message.type));
        message.id !== undefined && (obj.id = message.id);
        message.parent !== undefined && (obj.parent = message.parent);
        message.content !== undefined && (obj.content = message.content ? exports.GraphContent.toJSON(message.content) : undefined);
        message.user !== undefined && (obj.user = message.user ? exports.GraphUser.toJSON(message.user) : undefined);
        message.cdate !== undefined && (obj.cdate = message.cdate);
        message.mdate !== undefined && (obj.mdate = message.mdate);
        return obj;
    }
};
exports.GraphTopic = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(8).int32(message.type);
        if (message.message !== undefined && message.message !== undefined) {
            exports.GraphMessage.encode(message.message, writer.uint32(18).fork()).ldelim();
        }
        writer.uint32(24).int32(message.count);
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGraphTopic);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.message = exports.GraphMessage.decode(reader, reader.uint32());
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
    fromJSON: function (object) {
        var message = __assign({}, baseGraphTopic);
        if (object.type !== undefined && object.type !== null) {
            message.type = graphTypeFromJSON(object.type);
        }
        else {
            message.type = 0;
        }
        if (object.message !== undefined && object.message !== null) {
            message.message = exports.GraphMessage.fromJSON(object.message);
        }
        else {
            message.message = undefined;
        }
        if (object.count !== undefined && object.count !== null) {
            message.count = Number(object.count);
        }
        else {
            message.count = 0;
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGraphTopic);
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = 0;
        }
        if (object.message !== undefined && object.message !== null) {
            message.message = exports.GraphMessage.fromPartial(object.message);
        }
        else {
            message.message = undefined;
        }
        if (object.count !== undefined && object.count !== null) {
            message.count = object.count;
        }
        else {
            message.count = 0;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.type !== undefined && (obj.type = graphTypeToJSON(message.type));
        message.message !== undefined && (obj.message = message.message ? exports.GraphMessage.toJSON(message.message) : undefined);
        message.count !== undefined && (obj.count = message.count);
        return obj;
    }
};
exports.GraphRoot = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(8).int32(message.type);
        Object.entries(message.topics).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            exports.GraphRoot_TopicsEntry.encode({ key: key, value: value }, writer.uint32(18).fork()).ldelim();
        });
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGraphRoot);
        message.topics = {};
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    var entry2 = exports.GraphRoot_TopicsEntry.decode(reader, reader.uint32());
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
    fromJSON: function (object) {
        var message = __assign({}, baseGraphRoot);
        message.topics = {};
        if (object.type !== undefined && object.type !== null) {
            message.type = graphTypeFromJSON(object.type);
        }
        else {
            message.type = 0;
        }
        if (object.topics !== undefined && object.topics !== null) {
            Object.entries(object.topics).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                message.topics[key] = exports.GraphTopic.fromJSON(value);
            });
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGraphRoot);
        message.topics = {};
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = 0;
        }
        if (object.topics !== undefined && object.topics !== null) {
            Object.entries(object.topics).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (value !== undefined) {
                    message.topics[key] = exports.GraphTopic.fromPartial(value);
                }
            });
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.type !== undefined && (obj.type = graphTypeToJSON(message.type));
        obj.topics = {};
        if (message.topics) {
            Object.entries(message.topics).forEach(function (_a) {
                var k = _a[0], v = _a[1];
                obj.topics[k] = exports.GraphTopic.toJSON(v);
            });
        }
        return obj;
    }
};
exports.GraphRoot_TopicsEntry = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(10).string(message.key);
        if (message.value !== undefined && message.value !== undefined) {
            exports.GraphTopic.encode(message.value, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGraphRoot_TopicsEntry);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = exports.GraphTopic.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseGraphRoot_TopicsEntry);
        if (object.key !== undefined && object.key !== null) {
            message.key = String(object.key);
        }
        else {
            message.key = "";
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = exports.GraphTopic.fromJSON(object.value);
        }
        else {
            message.value = undefined;
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGraphRoot_TopicsEntry);
        if (object.key !== undefined && object.key !== null) {
            message.key = object.key;
        }
        else {
            message.key = "";
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = exports.GraphTopic.fromPartial(object.value);
        }
        else {
            message.value = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined && (obj.value = message.value ? exports.GraphTopic.toJSON(message.value) : undefined);
        return obj;
    }
};
var windowBase64 = globalThis;
var atob = windowBase64.atob || (function (b64) { return Buffer.from(b64, 'base64').toString('binary'); });
var btoa = windowBase64.btoa || (function (bin) { return Buffer.from(bin, 'binary').toString('base64'); });
function bytesFromBase64(b64) {
    var bin = atob(b64);
    var arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
function base64FromBytes(arr) {
    var bin = [];
    for (var i = 0; i < arr.byteLength; ++i) {
        bin.push(String.fromCharCode(arr[i]));
    }
    return btoa(bin.join(''));
}
