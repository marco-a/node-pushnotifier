"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Reads a file in base64 format.
 */
function _default(path) {
  return new Promise(function (resolve, reject) {
    _fs["default"].readFile(path, {
      encoding: "base64"
    }, function (error, contents) {
      if (error !== null) {
        reject(error);
      } else {
        resolve(contents);
      }
    });
  });
}

