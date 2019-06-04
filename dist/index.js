"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isObject = _interopRequireDefault(require("./lib/isObject"));

var _base64encode = _interopRequireDefault(require("./lib/base64encode"));

var _AppToken = _interopRequireDefault(require("./AppToken"));

var _Device = _interopRequireDefault(require("./Device"));

var _User = _interopRequireDefault(require("./User"));

var _request = _interopRequireDefault(require("./lib/request"));

var _api = _interopRequireDefault(require("./lib/api/"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PushNotifier = function PushNotifier(properties) {
  // ensure we always create an instance
  if (!(this instanceof PushNotifier)) {
    return new PushNotifier(APIToken, packageIdentifier);
  } // api token and package identifier *must*
  // be specified


  if (!(0, _isObject["default"])(properties)) {
    throw new Error("Properties must be an object.");
  } else if (!("api_token" in properties)) {
    throw new Error("api_token missing in properties.");
  } else if (!("package" in properties)) {
    throw new Error("package missing in properties.");
  } // convert app_token to string if
  // it is an instance of AppToken


  if ("app_token" in properties && properties.app_token instanceof _AppToken["default"]) {
    properties.app_token = properties.app_token.getValue();
  } // save properties


  this.properties = _objectSpread({}, properties, {
    // internal properties
    _internal: {
      // compute authorization header
      authorizationHeader: "Basic " + (0, _base64encode["default"])(properties["package"] + ":" + properties.api_token)
    }
  });
}; // Allow end user to set app token


PushNotifier.prototype.setAppToken = function (appToken) {
  if (appToken instanceof _AppToken["default"]) {
    appToken = appToken.getValue();
  }

  this.properties.app_token = appToken;
}; // API Endpoint


PushNotifier.prototype.makeAPICall = function (method, path, data) {
  var _this = this;

  return new Promise(function (resolve, reject) {
    var requestHeaders = {
      // automagically append authorization header
      "Authorization": _this.properties._internal.authorizationHeader // add app token if available

    };

    if ("app_token" in _this.properties) {
      requestHeaders["X-AppToken"] = _this.properties.app_token;
    }

    (0, _request["default"])(method, "https://api.pushnotifier.de" + path, data, requestHeaders).then(function (response) {
      if (response.statusCode === 200) {
        resolve(response.body);
      } else {
        reject(response);
      }
    })["catch"](reject);
  });
}; // API calls


var _loop = function _loop(apiCall) {
  PushNotifier.prototype[apiCall] = function () {
    // make sure app_token is available
    // for api calls that need it.
    if (apiCall !== "login" && !("app_token" in this.properties)) {
      throw new Error("API call '" + apiCall + "' needs app_token to be set.\n" + "You can set the app token like this: instance.setAppToken(\"...\").");
    }

    return _api["default"][apiCall].apply(this, arguments);
  };
};

for (var apiCall in _api["default"]) {
  _loop(apiCall);
} // Export Device, User and AppToken to end user


PushNotifier.Device = _Device["default"];
PushNotifier.User = _User["default"];
PushNotifier.AppToken = _AppToken["default"];
var _default = PushNotifier;
exports["default"] = _default;

