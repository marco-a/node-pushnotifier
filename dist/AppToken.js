"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getTime = _interopRequireDefault(require("./lib/getTime"));

var _writeFile = _interopRequireDefault(require("./lib/writeFile"));

var _readFile = _interopRequireDefault(require("./lib/readFile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AppToken = function AppToken(value, expiresAt) {
  this.properties = {
    value: value,
    expiresAt: expiresAt
  };
};

AppToken.prototype.getValue = function () {
  return this.properties.value;
};

AppToken.prototype.getExpiresAt = function () {
  return this.properties.expiresAt;
};

AppToken.prototype.needsRefresh = function () {
  var currentTime = (0, _getTime["default"])();
  return currentTime >= this.properties.expiresAt;
};
/**
 * Writes app token to disk.
 */


AppToken.prototype.toDisk = function (file) {
  var _this = this;

  var data = JSON.stringify({
    value: this.properties.value,
    expiresAt: this.properties.expiresAt
  });
  return new Promise(function (resolve, reject) {
    (0, _writeFile["default"])(file, data).then(function () {
      resolve(_this);
    })["catch"](reject);
  });
};
/**
 * Reads app token from disk.
 */


AppToken.fromDisk = function (path) {
  return new Promise(function (resolve, reject) {
    (0, _readFile["default"])(path).then(function (_) {
      return JSON.parse(_);
    }).then(function (_) {
      return new AppToken(_.value, _.expiresAt);
    }).then(resolve)["catch"](reject);
  });
};

var _default = AppToken;
exports["default"] = _default;

