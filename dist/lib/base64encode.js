"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
 * Converts string to base64.
 */
function _default(string) {
  return Buffer.from(string).toString("base64");
}

