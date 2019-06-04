"use strict";

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var USERNAME = "username";
var PASSWORD = "password";
var API_TOKEN = "api_token";
var PACKAGE = "package";
var APP_TOKEN_FILE = "/path/to/your/token/file.json";
var SEND = false;

function main(appToken) {
  var instance = new _index["default"]({
    api_token: API_TOKEN,
    "package": PACKAGE,
    app_token: appToken
  }); // get all devices

  instance.getDevices().then(function (devices) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = devices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var device = _step.value;
        console.log(device.getTitle() + " (" + device.getModel() + ")");
        SEND && device.sendText("Hello from node ! (1)");
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    SEND && instance.sendText(devices, "Hello from node ! (2)");
  });
} // attempt to read token from disk


_index["default"].AppToken.fromDisk(APP_TOKEN_FILE).then(function (appToken) {
  main(appToken);
})["catch"](function (error) {
  // create new app token
  var instance = new _index["default"]({
    api_token: API_TOKEN,
    "package": PACKAGE
  });
  instance.login(USERNAME, PASSWORD).then(function (user) {
    console.log("Hello " + user.getUsername()); // save token to disk

    return user.getAppToken().toDisk(APP_TOKEN_FILE);
  }).then(function (appToken) {
    main(appToken);
  })["catch"](function (error) {
    console.log("Failed to log you in.", error);
  });
});

