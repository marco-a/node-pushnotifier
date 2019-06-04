"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _Device = _interopRequireDefault(require("../../Device"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default() {
  var _this = this;

  return new Promise(function (resolve, reject) {
    _this.makeAPICall("GET", "/v2/devices", null).then(function (_) {
      return _.map(function (device) {
        return new _Device["default"](device, _this);
      });
    }).then(resolve)["catch"](reject);
  });
}

