/**
 * Copyright (c) 2019 Marco Agnoli
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

import isObject from "./lib/isObject"
import base64encode from "./lib/base64encode"

import AppToken from "./AppToken"
import Device from "./Device"
import User from "./User"

const PushNotifier = function(properties) {
	// ensure we always create an instance
	if (!(this instanceof PushNotifier)) {
		return new PushNotifier(APIToken, packageIdentifier)
	}

	// api token and package identifier *must*
	// be specified
	if (!isObject(properties)) {
		throw new Error("Properties must be an object.")
	} else if (!("api_token" in properties)) {
		throw new Error("api_token missing in properties.")
	} else if (!("package" in properties)) {
		throw new Error("package missing in properties.")
	}

	// convert app_token to string if
	// it is an instance of AppToken
	if ("app_token" in properties && properties.app_token instanceof AppToken) {
		properties.app_token = properties.app_token.getValue()
	}

	// save properties
	this.properties = {
		...properties,
		// internal properties
		_internal: {
			// compute authorization header
			authorizationHeader: "Basic " + base64encode(properties.package + ":" + properties.api_token)
		}
	}
}

// Allow end user to set app token

PushNotifier.prototype.setAppToken = function(appToken) {
	if (appToken instanceof AppToken) {
		appToken = appToken.getValue()
	}

	this.properties.app_token = appToken
}

// API Endpoint
import request from "./lib/request"

PushNotifier.prototype.makeAPICall = function(method, path, data) {
	return new Promise((resolve, reject) => {
		let requestHeaders = {
			// automagically append authorization header
			"Authorization": this.properties._internal.authorizationHeader
		}

		// add app token if available
		if ("app_token" in this.properties) {
			requestHeaders["X-AppToken"] = this.properties.app_token
		}

		request(method, "https://api.pushnotifier.de" + path, data, requestHeaders)
		.then(response => {
			if (response.statusCode === 200) {
				resolve(response.body)
			} else {
				reject(response)
			}
		})
		.catch(reject)
	})
}

// API calls
import apiCalls from "./lib/api/"

for (const apiCall in apiCalls) {
	PushNotifier.prototype[apiCall] = function() {
		// make sure app_token is available
		// for api calls that need it.
		if (apiCall !== "login" && !("app_token" in this.properties)) {
			throw new Error(
				"API call '" + apiCall + "' needs app_token to be set.\n" +
				"You can set the app token like this: instance.setAppToken(\"...\")."
			)
		}

		return apiCalls[apiCall].apply(this, arguments)
	}
}

// Export Device, User and AppToken to end user
PushNotifier.Device = Device
PushNotifier.User = User
PushNotifier.AppToken = AppToken

export default PushNotifier
