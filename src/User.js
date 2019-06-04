const User = function(data) {
	this.properties = {
		...data
	}
}

User.prototype.getUsername = function() {
	return this.properties.username
}

User.prototype.getAvatar = function() {
	return this.properties.avatar
}

import AppToken from "./AppToken"

User.prototype.getAppToken = function() {
	return new AppToken(this.properties.app_token, this.properties.expires_at)
}

export default User
