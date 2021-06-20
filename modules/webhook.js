var LaptopDAO = require("../dao/LaptopDAO")
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");


let laptop
let name = ""
let cpu = ""
let ram = ""
let price1 = ""
let price2 = ""
let price = ""

function getprice(num) {
	if (num == "") return ""
	if (num[num.length - 1] == "M" || num[num.length - 1] == "m" || num.includes("triệu") || num.includes("tr")) {
		num = parseInt(num.replace("M", "").replace("m", "").replace("triệu", "").replace("tr").replace(" ", "")) * Math.pow(10, 6)
	}
	return num
}
async function findLaptopByName() {
	if (name != "" && name != undefined && name != null) await LaptopDAO.findOne({ where: { name: name } })
		.then(lap => {
			if (lap == null) laptop = null
			else laptop = lap.dataValues
		})
}

async function recommentLaptop() {
	await LaptopDAO.findAll({ order: Sequelize.literal('rand()'), limit: 1 }).then(lap => laptop = lap[0].dataValues)
}

async function findLaptop() {
	let sql = {}

	ram = ram.replace("gb", "GB")

	price = getprice(price)
	price1 = getprice(price1)
	price2 = getprice(price2)


	if (ram != "") sql = { ...sql, ram: ram }
	if (cpu != "") sql = { ...sql, cpu: cpu }
	if (price != "") sql = {
		...sql,
		price: {
			[Op.gt]: price - 2000000,
			[Op.lte]: price + 2000000
		}
	}
	if (price1 != "" && price2 != "") sql = {
		...sql,
		price: {
			[Op.gt]: Math.min(price1, price2),
			[Op.lt]: Math.max(price1, price2)
		}
	}
	if (price1 == "" && price2 != "") sql = {
		...sql,
		price: {
			[Op.gt]: price2 - 2000000,
			[Op.lt]: price2 + 2000000
		}
	}
	await LaptopDAO.findAll({ where: sql, order: Sequelize.literal('rand()'), limit: 1 })
		.then(lap => {
			if (lap.length == 0) laptop = null
			else laptop = lap[0].dataValues
		})

}

module.exports = async function createResponseFulfillment(req) {
	let parameters = req.body.queryResult.parameters
	if (parameters.name) name = parameters.name
	if (parameters.cpu) cpu = parameters.cpu
	if (parameters.ram) ram = parameters.ram
	if (parameters.price) price = parameters.price
	if (parameters.price2) price2 = parameters.price2
	if (parameters.price1) price1 = parameters.price1

	let fulfillmentMessages = req.body.queryResult.fulfillmentMessages
	let payload = fulfillmentMessages.filter(value => value.payload != null)
	if (payload.length == 0) {
		return fulfillmentMessages
	}
	else {
		payload = payload[0].payload
		let data = payload.data

		if (data.parameters) {
			await eval(`(async () => await ${data.parameters.function})()`)
		}
		if (laptop) {
			data.responseIfFind.forEach(value => {
				if (value.card) {
					let card = value.card
					fulfillmentMessages.push(
						{
							"card": {
								"title": eval(card.title),
								"imageUri": eval(card.imageUri),
								"buttons": card.buttons.map(x => {
									return {
										"text": eval(x)
									}
								})
							}
						}
					)
				}
				if (value.text) {
					fulfillmentMessages.push(
						{
							"text": {
								"text": [
									eval(value.text.text)
								]
							}
						}
					)
				}
			})
		}
		else {
			data.responseIfNotFind.forEach(value => {
				if (value.card) {
					let card = value.card
					fulfillmentMessages.push(
						{
							"card": {
								"title": eval(card.title),
								"imageUri": eval(card.image),
								"buttons": card.buttons.map(x => {
									return {
										"text": eval(x)
									}
								})
							}
						}
					)

				}
				if (value.text) {
					fulfillmentMessages.push(
						{
							"text": {
								"text": [
									eval(value.text.text)
								]
							}
						}
					)
				}
			})
		}

		return fulfillmentMessages
	}
}
