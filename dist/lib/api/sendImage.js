"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _devices2 = _interopRequireDefault(require("./_devices"));

var _readFileBase = _interopRequireDefault(require("../readFileBase64"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(devices, path) {
  var _this = this;

  return new Promise(function (resolve, reject) {
    (0, _readFileBase["default"])(path).then(function (base64Content) {
      return _this.makeAPICall("PUT", "/v2/notifications/image", {
        devices: (0, _devices2["default"])(devices),
        content: base64Content,
        filename: require("path").basename(path)
      });
    }).then(resolve)["catch"](reject);
  });
}

