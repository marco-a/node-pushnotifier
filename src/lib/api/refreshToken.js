import AppToken from "../../AppToken"

export default function() {
	return new Promise((resolve, reject) => {
		this.makeAPICall("GET", "/v2/user/refresh", null)
		.then(_ => {
			return new AppToken(_.app_token, _.expires_at)
		})
		.then(resolve)
		.catch(reject)
	})
}
