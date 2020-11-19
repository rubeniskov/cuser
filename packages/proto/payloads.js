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
exports.PayloadQueryMessagesResult = exports.PayloadQueryMessages = exports.PayloadDeleteMessage = exports.PayloadUpdateMessage = exports.PayloadPublishMessage = exports.PayloadContent = exports.PayloadUser = exports.protobufPackage = void 0;
/* eslint-disable */
var graphs_1 = require("./graphs");
var minimal_1 = require("protobufjs/minimal");
var basePayloadUser = {
    peerId: "",
    username: "",
    avatar: ""
};
var basePayloadContent = {
    data: ""
};
var basePayloadPublishMessage = {
    topicId: ""
};
var basePayloadUpdateMessage = {
    topicId: "",
    messageId: ""
};
var basePayloadDeleteMessage = {
    topicId: "",
    messageId: ""
};
var basePayloadQueryMessages = {
    topicId: ""
};
var basePayloadQueryMessagesResult = {};
exports.protobufPackage = 'cuser.payloads';
exports.PayloadUser = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(10).string(message.peerId);
        writer.uint32(18).string(message.username);
        writer.uint32(26).string(message.avatar);
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, basePayloadUser);
        while (reader.pos < end) {
            var tag = reader.uint32();
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
    fromJSON: function (object) {
        var message = __assign({}, basePayloadUser);
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
        var message = __assign({}, basePayloadUser);
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
        message.peerId !== undefined && (obj.peerId = message.peerId);
        message.username !== undefined && (obj.username = message.username);
        message.avatar !== undefined && (obj.avatar = message.avatar);
        return obj;
    }
};
exports.PayloadContent = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(18).string(message.data);
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, basePayloadContent);
        while (reader.pos < end) {
            var tag = reader.uint32();
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
    fromJSON: function (object) {
        var message = __assign({}, basePayloadContent);
        if (object.data !== undefined && object.data !== null) {
            message.data = String(object.data);
        }
        else {
            message.data = "";
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, basePayloadContent);
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        else {
            message.data = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.data !== undefined && (obj.data = message.data);
        return obj;
    }
};
exports.PayloadPublishMessage = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(10).string(message.topicId);
        if (message.content !== undefined && message.content !== undefined) {
            exports.PayloadContent.encode(message.content, writer.uint32(18).fork()).ldelim();
        }
        if (message.user !== undefined && message.user !== undefined) {
            exports.PayloadUser.encode(message.user, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, basePayloadPublishMessage);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.topicId = reader.string();
                    break;
                case 2:
                    message.content = exports.PayloadContent.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.user = exports.PayloadUser.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, basePayloadPublishMessage);
        if (object.topicId !== undefined && object.topicId !== null) {
            message.topicId = String(object.topicId);
        }
        else {
            message.topicId = "";
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = exports.PayloadContent.fromJSON(object.content);
        }
        else {
            message.content = undefined;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = exports.PayloadUser.fromJSON(object.user);
        }
        else {
            message.user = undefined;
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, basePayloadPublishMessage);
        if (object.topicId !== undefined && object.topicId !== null) {
            message.topicId = object.topicId;
        }
        else {
            message.topicId = "";
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = exports.PayloadContent.fromPartial(object.content);
        }
        else {
            message.content = undefined;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = exports.PayloadUser.fromPartial(object.user);
        }
        else {
            message.user = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.topicId !== undefined && (obj.topicId = message.topicId);
        message.content !== undefined && (obj.content = message.content ? exports.PayloadContent.toJSON(message.content) : undefined);
        message.user !== undefined && (obj.user = message.user ? exports.PayloadUser.toJSON(message.user) : undefined);
        return obj;
    }
};
exports.PayloadUpdateMessage = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(10).string(message.topicId);
        writer.uint32(18).string(message.messageId);
        if (message.content !== undefined && message.content !== undefined) {
            exports.PayloadContent.encode(message.content, writer.uint32(26).fork()).ldelim();
        }
        if (message.user !== undefined && message.user !== undefined) {
            exports.PayloadUser.encode(message.user, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, basePayloadUpdateMessage);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.topicId = reader.string();
                    break;
                case 2:
                    message.messageId = reader.string();
                    break;
                case 3:
                    message.content = exports.PayloadContent.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.user = exports.PayloadUser.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, basePayloadUpdateMessage);
        if (object.topicId !== undefined && object.topicId !== null) {
            message.topicId = String(object.topicId);
        }
        else {
            message.topicId = "";
        }
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = String(object.messageId);
        }
        else {
            message.messageId = "";
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = exports.PayloadContent.fromJSON(object.content);
        }
        else {
            message.content = undefined;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = exports.PayloadUser.fromJSON(object.user);
        }
        else {
            message.user = undefined;
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, basePayloadUpdateMessage);
        if (object.topicId !== undefined && object.topicId !== null) {
            message.topicId = object.topicId;
        }
        else {
            message.topicId = "";
        }
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = object.messageId;
        }
        else {
            message.messageId = "";
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = exports.PayloadContent.fromPartial(object.content);
        }
        else {
            message.content = undefined;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = exports.PayloadUser.fromPartial(object.user);
        }
        else {
            message.user = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.topicId !== undefined && (obj.topicId = message.topicId);
        message.messageId !== undefined && (obj.messageId = message.messageId);
        message.content !== undefined && (obj.content = message.content ? exports.PayloadContent.toJSON(message.content) : undefined);
        message.user !== undefined && (obj.user = message.user ? exports.PayloadUser.toJSON(message.user) : undefined);
        return obj;
    }
};
exports.PayloadDeleteMessage = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(10).string(message.topicId);
        writer.uint32(18).string(message.messageId);
        if (message.user !== undefined && message.user !== undefined) {
            exports.PayloadUser.encode(message.user, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, basePayloadDeleteMessage);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.topicId = reader.string();
                    break;
                case 2:
                    message.messageId = reader.string();
                    break;
                case 3:
                    message.user = exports.PayloadUser.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, basePayloadDeleteMessage);
        if (object.topicId !== undefined && object.topicId !== null) {
            message.topicId = String(object.topicId);
        }
        else {
            message.topicId = "";
        }
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = String(object.messageId);
        }
        else {
            message.messageId = "";
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = exports.PayloadUser.fromJSON(object.user);
        }
        else {
            message.user = undefined;
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, basePayloadDeleteMessage);
        if (object.topicId !== undefined && object.topicId !== null) {
            message.topicId = object.topicId;
        }
        else {
            message.topicId = "";
        }
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = object.messageId;
        }
        else {
            message.messageId = "";
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = exports.PayloadUser.fromPartial(object.user);
        }
        else {
            message.user = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.topicId !== undefined && (obj.topicId = message.topicId);
        message.messageId !== undefined && (obj.messageId = message.messageId);
        message.user !== undefined && (obj.user = message.user ? exports.PayloadUser.toJSON(message.user) : undefined);
        return obj;
    }
};
exports.PayloadQueryMessages = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
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
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, basePayloadQueryMessages);
        while (reader.pos < end) {
            var tag = reader.uint32();
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
    fromJSON: function (object) {
        var message = __assign({}, basePayloadQueryMessages);
        if (object.topicId !== undefined && object.topicId !== null) {
            message.topicId = String(object.topicId);
        }
        else {
            message.topicId = "";
        }
        if (object.first !== undefined && object.first !== null) {
            message.first = Number(object.first);
        }
        else {
            message.first = undefined;
        }
        if (object.last !== undefined && object.last !== null) {
            message.last = Number(object.last);
        }
        else {
            message.last = undefined;
        }
        if (object.after !== undefined && object.after !== null) {
            message.after = Number(object.after);
        }
        else {
            message.after = undefined;
        }
        if (object.offset !== undefined && object.offset !== null) {
            message.offset = Number(object.offset);
        }
        else {
            message.offset = undefined;
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, basePayloadQueryMessages);
        if (object.topicId !== undefined && object.topicId !== null) {
            message.topicId = object.topicId;
        }
        else {
            message.topicId = "";
        }
        if (object.first !== undefined && object.first !== null) {
            message.first = object.first;
        }
        else {
            message.first = undefined;
        }
        if (object.last !== undefined && object.last !== null) {
            message.last = object.last;
        }
        else {
            message.last = undefined;
        }
        if (object.after !== undefined && object.after !== null) {
            message.after = object.after;
        }
        else {
            message.after = undefined;
        }
        if (object.offset !== undefined && object.offset !== null) {
            message.offset = object.offset;
        }
        else {
            message.offset = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.topicId !== undefined && (obj.topicId = message.topicId);
        message.first !== undefined && (obj.first = message.first);
        message.last !== undefined && (obj.last = message.last);
        message.after !== undefined && (obj.after = message.after);
        message.offset !== undefined && (obj.offset = message.offset);
        return obj;
    }
};
exports.PayloadQueryMessagesResult = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        for (var _i = 0, _a = message.messages; _i < _a.length; _i++) {
            var v = _a[_i];
            graphs_1.GraphMessage.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, basePayloadQueryMessagesResult);
        message.messages = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messages.push(graphs_1.GraphMessage.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, basePayloadQueryMessagesResult);
        message.messages = [];
        if (object.messages !== undefined && object.messages !== null) {
            for (var _i = 0, _a = object.messages; _i < _a.length; _i++) {
                var e = _a[_i];
                message.messages.push(graphs_1.GraphMessage.fromJSON(e));
            }
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, basePayloadQueryMessagesResult);
        message.messages = [];
        if (object.messages !== undefined && object.messages !== null) {
            for (var _i = 0, _a = object.messages; _i < _a.length; _i++) {
                var e = _a[_i];
                message.messages.push(graphs_1.GraphMessage.fromPartial(e));
            }
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        if (message.messages) {
            obj.messages = message.messages.map(function (e) { return e ? graphs_1.GraphMessage.toJSON(e) : undefined; });
        }
        else {
            obj.messages = [];
        }
        return obj;
    }
};
