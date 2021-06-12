var LaptopDAO = require("../dao/LaptopDAO")
const Card = require("../model/Card")
const Text = require("../model/Text")
var BillDAO = require("../dao/BillDao")

module.exports = async function createResponseFulfillment(req) {
	let intent = req.queryResult.intent.displayName
	let res
	if (intent === "Xem sản phẩm") {
		let laptopName = req.queryResult.parameters.laptop
		var laptop = await LaptopDAO.findOne({ where: { name: laptopName } })
		if(laptop == null) res = {
			"fulfillmentMessages": [
				{
					"text": new Text("Sản phẩm không tồn tại hoặc hết hàng, vui lòng xem sản phẩm khác")
				}
			]
		}
		else res = {
			"fulfillmentMessages": [
				{
					"text": new Text("Đây là sản phẩm mình tìm được")
				},
				{
					"card": new Card("Laptop", laptop.name, laptop.image)
				},
				{
					"text": new Text(`CPU: ${laptop.cpu}, RAM: ${laptop.ram}`)
				}
			]
		}
		return res
	}
	if (intent === "Mua sản phẩm") {
		let name = req.queryResult.outputContexts[0].parameters.laptop
		let email = req.queryResult.parameters.email
		let phone = req.queryResult.parameters.phone
		let address = req.queryResult.parameters.address['admin-area']
		const bill = BillDAO.build({
			name:name,
			email:email,
			phone:phone,
			address:address
		})
		bill.save()
		let res = {
			"fulfillmentMessages": [
				{
					"text": new Text("Đã đặt hàng thành công. Shop sẽ liên lạc trong thời gian ngắn nhất")
				},
			]
		}
	}
}