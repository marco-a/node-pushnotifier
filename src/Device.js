const Device = function(data, inst) {
	this.properties = {
		...data
	}

	this.instance = inst
}

Device.prototype.getID = function() {
	return this.properties.id
}

Device.prototype.getTitle = function() {
	return this.properties.title
}

Device.prototype.getModel = function() {
	return this.properties.model
}

Device.prototype.getImage = function() {
	return this.properties.image
}

Device.prototype.sendText = function(text) {
	return this.instance.sendText(this, text)
}

Device.prototype.sendURL = function(URL) {
	return this.instance.sendURL(this, URL)
}

Device.prototype.sendNotification = function(text, URL) {
	return this.instance.sendNotification(this, text, URL)
}

Device.prototype.sendImage = function(image) {
	return this.instance.sendImage(this, image)
}

export default Device
