module.exports = class Parameter {
	constructor(){
		this.displayName = ""
		this.value = ""
		this.defaultValue = ""
		this.mandatory = true
		this.prompts = []
		this.isList = false
		this.entityTypeDisplayName = ""
	}
}