import _devices from "./_devices"

export default function(devices, text) {
	return this.makeAPICall("PUT", "/v2/notifications/text", {
		devices: _devices(devices),
		content: text
	})
}
