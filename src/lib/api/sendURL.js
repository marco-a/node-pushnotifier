import _devices from "./_devices"

export default function(devices, URL) {
	return this.makeAPICall("PUT", "/v2/notifications/url", {
		devices: _devices(devices),
		url: URL
	})
}
