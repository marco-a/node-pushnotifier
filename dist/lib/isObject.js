"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
 * Checks if variable is indeed an object.
 */
function _default(v) {
  return Object.prototype.toString.call(v) === "[object Object]";
}

