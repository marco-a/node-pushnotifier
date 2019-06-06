# node-pushnotifier

A library to utilize pushnotifier's **V2** API in nodejs.

## Getting started

* Obtain your API token from [pushnotifier.de](https://pushnotifier.de).
* Create an application on [pushnotifier.de](https://pushnotifier.de).

## Instantiation

There are two ways to instantiate the library:

1. Without an `app_token`.
2. With `app_token` (obtained through login).


Instantiation goes as follow:

```javascript
import PushNotifier from "node-pushnotifier"

const instance = new PushNotifier({
	"api_token": "YOUR_API_TOKEN",
	"package": "YOUR_PACKAGE_IDENTIFIER",
	// "app_token", if you have it
})
```

## Functions overview

The following functions are available:

- login(`username, password`) : `User`
- getDevices() : `[Devices]`
- sendText(`devices, text`) : `response`
- sendURL(`devices, URL`) : `response`
- sendNotification(`devices, text, URL`) : `response`
- sendImage(`devices, image`) : `response`
- refreshToken() : `AppToken`


## Instances

### User

- getUsername() : `string`
- getAvatar() : `string`
- getAppToken() : `AppToken`

### AppToken

- getValue() : `string`
- getExpiresAt() : `integer`
- needsRefresh() : `bool`
- toDisk(`path`) : `AppToken`
- fromDisk(`path`) : `AppToken`

### Device

- getID() : `string`
- getTitle() : `string`
- getModel() : `string`
- getImage() : `string`
- sendText(`text`) : `response`
- sendURL(`URL`) : `response`
- sendNotification(`text, URL`) : `response`
- sendImage(`image`) : `response`

## Example

```javascript
const instance = new PushNotifier({
	"api_token": "...",
	"package": "..."
})

instance.login("username", "password")
.then(user => {
	// set app token for instance (or create a new one)
	instance.setAppToken(user.getAppToken())
	
	// iterate through devices
	instance.getDevices()
	.then(devices => {
		// list devices
		for (const device of devices) {
			console.log(device.getTitle() + " (" + device.getModel() + ")")
		}
		
		// send text to all devices
		instance.sendText(devices, "Hello from node :)")
	})
})
.catch(error => {
	// oops something went wrong
})
```
