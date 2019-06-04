"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Device = function Device(data, inst) {
  this.properties = _objectSpread({}, data);
  this.instance = inst;
};

Device.prototype.getID = function () {
  return this.properties.id;
};

Device.prototype.getTitle = function () {
  return this.properties.title;
};

Device.prototype.getModel = function () {
  return this.properties.model;
};

Device.prototype.getImage = function () {
  return this.properties.image;
};

Device.prototype.sendText = function (text) {
  return this.instance.sendText(this, text);
};

Device.prototype.sendURL = function (URL) {
  return this.instance.sendURL(this, URL);
};

Device.prototype.sendNotification = function (text, URL) {
  return this.instance.sendNotification(this, text, URL);
};

Device.prototype.sendImage = function (image) {
  return this.instance.sendImage(this, image);
};

var _default = Device;
exports["default"] = _default;

