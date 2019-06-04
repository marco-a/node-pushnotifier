/**
 * Checks if variable is indeed an array.
 */
export default function(v) {
	return Object.prototype.toString.call(v) === "[object Array]"
}
