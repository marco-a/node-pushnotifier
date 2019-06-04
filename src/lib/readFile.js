/**
 * Reads a file.
 */
import fs from "fs"

export default function(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, "utf8", (error, contents) => {
			if (error !== null) {
				reject(error)
			} else {
				resolve(contents)
			}
		})
	})
}
