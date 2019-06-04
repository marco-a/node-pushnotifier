/**
 * Checks if variable is indeed an object.
 */
export default function(v) {
	return Object.prototype.toString.call(v) === "[object Object]"
}
