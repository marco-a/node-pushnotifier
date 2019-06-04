/**
 * Makes a HTTPS GET/POST request.
 */
import url from "url"
import https from "https"

export default function(method, URL, data, headers = {}) {
	// parse URL
	URL = url.parse(URL)

	return new Promise((resolve, reject) => {
		const requestBody = data !== null ? JSON.stringify(data) : null

		let requestHeader = {
			...headers
		}

		// headers needed for POST/PUT
		if (method === "POST" || method === "PUT") {
			requestHeader["Content-Type"] = "application/json"
			requestHeader["Content-Length"] = requestBody.length
		}

		const options = {
			hostname: URL.hostname,
			path: URL.path,
			port: URL.port !== null ? URL.port : 443,
			method: method,
			headers: requestHeader
		}

		const request = https.request(options, (result) => {
			// we want a string, not a buffer
			result.setEncoding("UTF-8")

			result.on("data", (responseBody) => {
				try {
					const response = JSON.parse(responseBody)

					resolve({
						body: response,
						statusCode: result.statusCode
					})
				} catch (e) {
					reject(e)
				}
			})
		})

		// reject on error
		request.on("error", reject)

		if (requestBody !== null) {
			request.write(requestBody)
		}
		request.end()
	})
}
