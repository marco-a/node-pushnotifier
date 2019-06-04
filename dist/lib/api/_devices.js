"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _isArray = _interopRequireDefault(require("../isArray"));

var _Device = _interopRequireDefault(require("../../Device"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(devices) {
  if (!(0, _isArray["default"])(devices)) {
    devices = [devices];
  }

  return devices.map(function (device) {
    // is instance?
    if (device instanceof _Device["default"]) {
      return device.getID();
    }

    return device;
  });
}

