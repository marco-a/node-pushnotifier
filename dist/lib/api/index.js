"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _login = _interopRequireDefault(require("./login"));

var _refreshToken = _interopRequireDefault(require("./refreshToken"));

var _getDevices = _interopRequireDefault(require("./getDevices"));

var _sendText = _interopRequireDefault(require("./sendText"));

var _sendURL = _interopRequireDefault(require("./sendURL"));

var _sendNotification = _interopRequireDefault(require("./sendNotification"));

var _sendImage = _interopRequireDefault(require("./sendImage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  login: _login["default"],
  refreshToken: _refreshToken["default"],
  getDevices: _getDevices["default"],
  sendText: _sendText["default"],
  sendURL: _sendURL["default"],
  sendNotification: _sendNotification["default"],
  sendImage: _sendImage["default"]
};
exports["default"] = _default;

