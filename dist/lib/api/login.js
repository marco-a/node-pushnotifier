"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _User = _interopRequireDefault(require("../../User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(username, password) {
  var _this = this;

  return new Promise(function (resolve, reject) {
    _this.makeAPICall("POST", "/v2/user/login", {
      username: username,
      password: password
    }).then(function (_) {
      return new _User["default"](_);
    }).then(resolve)["catch"](reject);
  });
}

