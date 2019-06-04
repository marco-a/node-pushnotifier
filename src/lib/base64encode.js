/**
 * Converts string to base64.
 */
export default function(string) {
	return Buffer.from(string).toString("base64")
}
