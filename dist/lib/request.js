"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _url = _interopRequireDefault(require("url"));

var _https = _interopRequireDefault(require("https"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default(method, URL, data) {
  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  // parse URL
  URL = _url["default"].parse(URL);
  return new Promise(function (resolve, reject) {
    var requestBody = data !== null ? JSON.stringify(data) : null;

    var requestHeader = _objectSpread({}, headers); // headers needed for POST/PUT


    if (method === "POST" || method === "PUT") {
      requestHeader["Content-Type"] = "application/json";
      requestHeader["Content-Length"] = requestBody.length;
    }

    var options = {
      hostname: URL.hostname,
      path: URL.path,
      port: URL.port !== null ? URL.port : 443,
      method: method,
      headers: requestHeader
    };

    var request = _https["default"].request(options, function (result) {
      // we want a string, not a buffer
      result.setEncoding("UTF-8");
      result.on("data", function (responseBody) {
        try {
          var response = JSON.parse(responseBody);
          resolve({
            body: response,
            statusCode: result.statusCode
          });
        } catch (e) {
          reject(e);
        }
      });
    }); // reject on error


    request.on("error", reject);

    if (requestBody !== null) {
      request.write(requestBody);
    }

    request.end();
  });
}

