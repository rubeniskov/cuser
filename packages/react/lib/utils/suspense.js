"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(promise) {
  var status = "pending";
  var response;
  var suspender = promise.then(function (res) {
    status = "success";
    response = res;
  }, function (err) {
    status = "error";
    response = err;
  });

  var read = function read() {
    switch (status) {
      case "pending":
        throw suspender;

      case "error":
        throw response;

      default:
        return response;
    }
  };

  var result = {
    read: read
  };
  return result;
};

exports["default"] = _default;