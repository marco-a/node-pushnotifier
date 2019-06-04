import _devices from "./_devices"
import readFileBase64 from "../readFileBase64"

export default function(devices, path) {
	return new Promise((resolve, reject) => {
		readFileBase64(path)
		.then(base64Content => {
			return this.makeAPICall("PUT", "/v2/notifications/image", {
				devices: _devices(devices),
				content: base64Content,
				filename: require("path").basename(path)
			})
		})
		.then(resolve)
		.catch(reject)
	})
}
