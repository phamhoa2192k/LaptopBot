module.exports = class Card{
	constructor(title, name, image, buttons){
		this.title = title
		this.subtitle = name
		this.imageUri = image
		this.buttons = []
		buttons.forEach(value => {
			this.buttons = [
				...this.buttons,
				{
					"text": value
				}
			]
		})
	}
}