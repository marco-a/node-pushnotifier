"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _AppToken = _interopRequireDefault(require("../../AppToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default() {
  var _this = this;

  return new Promise(function (resolve, reject) {
    _this.makeAPICall("GET", "/v2/user/refresh", null).then(function (_) {
      return new _AppToken["default"](_.app_token, _.expires_at);
    }).then(resolve)["catch"](reject);
  });
}

