import Device from "../../Device"

export default function() {
	return new Promise((resolve, reject) => {
		this.makeAPICall("GET", "/v2/devices", null)
		.then(_ => {
			return _.map((device) => {
				return new Device(device, this)
			})
		})
		.then(resolve)
		.catch(reject)
	})
}
