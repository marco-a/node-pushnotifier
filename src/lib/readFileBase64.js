/**
 * Reads a file in base64 format.
 */
import fs from "fs"

export default function(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, {
			encoding: "base64"
		}, (error, contents) => {
			if (error !== null) {
				reject(error)
			} else {
				resolve(contents)
			}
		})
	})
}
