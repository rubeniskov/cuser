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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDeleteMessage = exports.ActionUpdateMessage = exports.ActionPublishMessage = exports.actionTypeToJSON = exports.actionTypeFromJSON = exports.ActionType = exports.protobufPackage = void 0;
/* eslint-disable */
var payloads_1 = require("./payloads");
var minimal_1 = require("protobufjs/minimal");
var baseActionPublishMessage = {
    type: 0,
};
var baseActionUpdateMessage = {
    type: 0,
};
var baseActionDeleteMessage = {
    type: 0,
};
exports.protobufPackage = 'cuser.actions';
var ActionType;
(function (ActionType) {
    ActionType[ActionType["ACTION_PUBLISH_MESSAGE"] = 0] = "ACTION_PUBLISH_MESSAGE";
    ActionType[ActionType["ACTION_UPDATE_MESSAGE"] = 1] = "ACTION_UPDATE_MESSAGE";
    ActionType[ActionType["ACTION_DELETE_MESSAGE"] = 2] = "ACTION_DELETE_MESSAGE";
    ActionType[ActionType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
function actionTypeFromJSON(object) {
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
exports.actionTypeFromJSON = actionTypeFromJSON;
function actionTypeToJSON(object) {
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
exports.actionTypeToJSON = actionTypeToJSON;
exports.ActionPublishMessage = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(8).int32(message.type);
        if (message.payload !== undefined && message.payload !== undefined) {
            payloads_1.PayloadPublishMessage.encode(message.payload, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseActionPublishMessage);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.payload = payloads_1.PayloadPublishMessage.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseActionPublishMessage);
        if (object.type !== undefined && object.type !== null) {
            message.type = actionTypeFromJSON(object.type);
        }
        else {
            message.type = 0;
        }
        if (object.payload !== undefined && object.payload !== null) {
            message.payload = payloads_1.PayloadPublishMessage.fromJSON(object.payload);
        }
        else {
            message.payload = undefined;
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseActionPublishMessage);
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = 0;
        }
        if (object.payload !== undefined && object.payload !== null) {
            message.payload = payloads_1.PayloadPublishMessage.fromPartial(object.payload);
        }
        else {
            message.payload = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.type !== undefined && (obj.type = actionTypeToJSON(message.type));
        message.payload !== undefined && (obj.payload = message.payload ? payloads_1.PayloadPublishMessage.toJSON(message.payload) : undefined);
        return obj;
    },
};
exports.ActionUpdateMessage = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(8).int32(message.type);
        if (message.payload !== undefined && message.payload !== undefined) {
            payloads_1.PayloadUpdateMessage.encode(message.payload, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseActionUpdateMessage);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.payload = payloads_1.PayloadUpdateMessage.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseActionUpdateMessage);
        if (object.type !== undefined && object.type !== null) {
            message.type = actionTypeFromJSON(object.type);
        }
        else {
            message.type = 0;
        }
        if (object.payload !== undefined && object.payload !== null) {
            message.payload = payloads_1.PayloadUpdateMessage.fromJSON(object.payload);
        }
        else {
            message.payload = undefined;
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseActionUpdateMessage);
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = 0;
        }
        if (object.payload !== undefined && object.payload !== null) {
            message.payload = payloads_1.PayloadUpdateMessage.fromPartial(object.payload);
        }
        else {
            message.payload = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.type !== undefined && (obj.type = actionTypeToJSON(message.type));
        message.payload !== undefined && (obj.payload = message.payload ? payloads_1.PayloadUpdateMessage.toJSON(message.payload) : undefined);
        return obj;
    },
};
exports.ActionDeleteMessage = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        writer.uint32(8).int32(message.type);
        if (message.payload !== undefined && message.payload !== undefined) {
            payloads_1.PayloadDeleteMessage.encode(message.payload, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseActionDeleteMessage);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.payload = payloads_1.PayloadDeleteMessage.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseActionDeleteMessage);
        if (object.type !== undefined && object.type !== null) {
            message.type = actionTypeFromJSON(object.type);
        }
        else {
            message.type = 0;
        }
        if (object.payload !== undefined && object.payload !== null) {
            message.payload = payloads_1.PayloadDeleteMessage.fromJSON(object.payload);
        }
        else {
            message.payload = undefined;
        }
        return message;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseActionDeleteMessage);
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = 0;
        }
        if (object.payload !== undefined && object.payload !== null) {
            message.payload = payloads_1.PayloadDeleteMessage.fromPartial(object.payload);
        }
        else {
            message.payload = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.type !== undefined && (obj.type = actionTypeToJSON(message.type));
        message.payload !== undefined && (obj.payload = message.payload ? payloads_1.PayloadDeleteMessage.toJSON(message.payload) : undefined);
        return obj;
    },
};
