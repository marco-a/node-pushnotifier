/**
 * Writes a file.
 */
import fs from "fs"

export default function(file, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, (error) => {
			if (error !== null) {
				reject(error)
			} else {
				resolve()
			}
		})
	})
}
