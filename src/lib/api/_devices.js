import isArray from "../isArray"
import Device from "../../Device"

export default function(devices) {
	if (!isArray(devices)) {
		devices = [devices]
	}

	return devices.map(device => {
		// is instance?
		if (device instanceof Device) {
			return device.getID()
		}

		return device
	})
}
