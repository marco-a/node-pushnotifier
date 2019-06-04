const AppToken = function(value, expiresAt) {
	this.properties = {
		value,
		expiresAt
	}
}

AppToken.prototype.getValue = function() {
	return this.properties.value
}

AppToken.prototype.getExpiresAt = function() {
	return this.properties.expiresAt
}

import getTime from "./lib/getTime"

AppToken.prototype.needsRefresh = function() {
	const currentTime = getTime()

	return currentTime >= this.properties.expiresAt
}

/**
 * Writes app token to disk.
 */
import writeFile from "./lib/writeFile"

AppToken.prototype.toDisk = function(file) {
	const data = JSON.stringify({
		value: this.properties.value,
		expiresAt: this.properties.expiresAt
	})

	return new Promise((resolve, reject) => {
		writeFile(file, data)
		.then(() => {
			resolve(this)
		})
		.catch(reject)
	})
}

/**
 * Reads app token from disk.
 */
import readFile from "./lib/readFile"

AppToken.fromDisk = function(path) {
	return new Promise((resolve, reject) => {
		readFile(path)
		.then(_ => {
			return JSON.parse(_)
		})
		.then(_ => {
			return new AppToken(_.value, _.expiresAt)
		})
		.then(resolve)
		.catch(reject)
	})
}

export default AppToken
