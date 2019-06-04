import _devices from "./_devices"

export default function(devices, text, URL) {
	return this.makeAPICall("PUT", "/v2/notifications/notification", {
		devices: _devices(devices),
		content: text,
		url: URL
	})
}
