import PushNotifier from "./index"

const USERNAME = "username"
const PASSWORD = "password"
const API_TOKEN = "api_token"
const PACKAGE = "package"
const APP_TOKEN_FILE = "/path/to/your/token/file.json"
const SEND = false

function main(appToken) {
	const instance = new PushNotifier({
		api_token: API_TOKEN,
		package: PACKAGE,
		app_token: appToken
	})

	// get all devices
	instance.getDevices()
	.then(devices => {
		for (const device of devices) {
			console.log(device.getTitle() + " (" + device.getModel() + ")")

			SEND && device.sendText("Hello from node ! (1)")
		}

		SEND && instance.sendText(devices, "Hello from node ! (2)")
	})
}

// attempt to read token from disk
PushNotifier.AppToken.fromDisk(APP_TOKEN_FILE)
.then(appToken => {
	main(appToken)
})
.catch(error => {
	// create new app token
	const instance = new PushNotifier({
		api_token: API_TOKEN,
		package: PACKAGE
	})

	instance.login(USERNAME, PASSWORD)
	.then(user => {
		console.log("Hello " + user.getUsername())

		// save token to disk
		return user.getAppToken().toDisk(APP_TOKEN_FILE)
	})
	.then(appToken => {
		main(appToken)
	})
	.catch(error => {
		console.log("Failed to log you in.", error)
	})
})
