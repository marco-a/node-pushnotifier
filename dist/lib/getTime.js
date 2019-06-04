"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
 * Returns the current time as unix timestamp.
 */
function _default() {
  return Math.floor(new Date().getTime() / 1000);
}

