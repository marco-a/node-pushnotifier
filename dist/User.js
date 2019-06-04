"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AppToken = _interopRequireDefault(require("./AppToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var User = function User(data) {
  this.properties = _objectSpread({}, data);
};

User.prototype.getUsername = function () {
  return this.properties.username;
};

User.prototype.getAvatar = function () {
  return this.properties.avatar;
};

User.prototype.getAppToken = function () {
  return new _AppToken["default"](this.properties.app_token, this.properties.expires_at);
};

var _default = User;
exports["default"] = _default;

