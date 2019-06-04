import User from "../../User"

export default function(username, password) {
	return new Promise((resolve, reject) => {
		this.makeAPICall("POST", "/v2/user/login", {
			username: username,
			password: password
		})
		.then(_ => {
			return new User(_)
		})
		.then(resolve)
		.catch(reject)
	})
}
