"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Writes a file.
 */
function _default(file, data) {
  return new Promise(function (resolve, reject) {
    _fs["default"].writeFile(file, data, function (error) {
      if (error !== null) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

