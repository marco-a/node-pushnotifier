"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _devices2 = _interopRequireDefault(require("./_devices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(devices, text, URL) {
  return this.makeAPICall("PUT", "/v2/notifications/notification", {
    devices: (0, _devices2["default"])(devices),
    content: text,
    url: URL
  });
}

