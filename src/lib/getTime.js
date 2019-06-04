/**
 * Returns the current time as unix timestamp.
 */
export default function() {
	return Math.floor((new Date()).getTime() / 1000)
}
