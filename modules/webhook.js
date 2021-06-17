var LaptopDAO = require("../dao/LaptopDAO")
const Card = require("../model/Card")
const Text = require("../model/Text")
var BillDAO = require("../dao/BillDAO")
const { Op } = require("sequelize");
let lastSeenLaptop =""

module.exports = async function createResponseFulfillment(req) {
	let intent = req.queryResult.intent.displayName
	let res = {}
	if(intent === "Chào hỏi"){
		res = {
			"followupEventInput": {
				"name": "recomment",
				"parameters": {
					"before": "Chào hỏi"
				      }
			}
		}
		return res
	}
	if (intent === "Xem sản phẩm") {
		let laptopName = req.queryResult.parameters.laptop
		lastSeenLaptop = laptopName

		var laptop = await LaptopDAO.findOne({ where: { name: laptopName } })
		if (laptop == null) res = {
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
					"text": new Text(`Laptop ${laptop.name}`)
				},
				{
					"card": new Card("Laptop", laptop.name, laptop.image,["Chi tiết","Còn hàng không","Mua"])
				},
				{
					"text": new Text(`CPU: ${laptop.cpu}, RAM: ${laptop.ram}`)
				}
			]
		}
		return res
	}
	if (intent === "Mua sản phẩm") {

		let name = req.queryResult.parameters.laptop // req.queryResult.outputContexts[0].parameters.laptop
		let email = req.queryResult.parameters.email
		let phone = req.queryResult.parameters.phone
		let address = req.queryResult.parameters.address['admin-area']
		let color = req.queryResult.parameters.color
		const bill = BillDAO.build({
			name: name,
			email: email,
			phone: phone,
			address: address
		})
		res = {
			"fulfillmentMessages": [
				{
					"text": new Text(`Bạn đã đặt mua laptop ${name} với màu ${color}`)
				},
				{
					"text": new Text(`Shop sẽ liên hệ bạn qua sđt ${phone}`)
				},
				{
					"text": new Text(`Cảm ơn bạn đã mua hàng. Nhân viên của shop sẽ liên lạc với bạn sớm nhất`)
				}
			]
		}
		bill.save()
		return res;
	}
	if (intent === "Giảm giá") {
		let name = lastSeenLaptop // req.queryResult.outputContexts[0].parameters.laptop
		var laptop = await LaptopDAO.findOne({ where: { name: name } })
		res = {
			"fulfillmentMessages": [
				{
					"text": new Text(`Sản phẩm ${name} đang có chương trình khuyến mại là ${laptop.promotion}`)
				}
			]
		}
		return res
	}
	if (intent === "Thông số sản phẩm") {
		let name = lastSeenLaptop // req.queryResult.outputContexts[0].parameters.laptop
		var laptop = await LaptopDAO.findOne({ where: { name: name } })
		res = {
			"fulfillmentMessages": [
				{
					"text": new Text(`Laptop ${name}: `)
				},
				{
					"text": new Text(`${laptop.detail}, CPU mạnh mẽ ${laptop.cpu}, RAM ${laptop.ram}`)
				},
				{
					"text": new Text(`Một số hình ảnh của máy`)
				},
				{
					"card": new Card("Laptop", laptop.name, laptop.image,["Còn hàng không","Màu sản phẩm"])
				}

			]
		}
		return res
	}
	if (intent === "Trạng thái sản phẩm") {
		let name = lastSeenLaptop // req.queryResult.outputContexts[0].parameters.laptop
		if(name == "") {
			res = {
				"fulfillmentMessages": [
					{
						"text": new Text(`Nhập tên sản phẩm bạn muốn xem trước nhé`)
					},
					{
						"card": new Card("","","",["Mua"])
					}
				]
			}
			return res
		}
		var laptop = await LaptopDAO.findOne({ where: { name: name } })
		if (laptop.quantity > 0) {
			res = {
				"fulfillmentMessages": [
					{
						"text": new Text(`Hiện phẩm còn hàng nhé.`)
					}
				]
			}
		}
		else {
			res = {
				"followupEventInput": {
					"name": "recomment",
					"parameters": {
						"before": "Trạng thái sản phẩm"
					      }
				}
			}
		}
		return res
	}
	if (intent === "Đề xuất sản phẩm") {
		var laptop = await LaptopDAO.findByPk(1)
		let before = req.queryResult.outputContexts[0].parameters.before
		if(before === "Chào hỏi"){
			res = {
				"fulfillmentMessages": [
					{
						"text": new Text("Xin chào, shop có thể giúp gì cho bạn?")
	
					},
					{
						"text": new Text(`Bạn có thể xem hàng, đặt hàng, cũng như tư vấn sản phẩm:`)
					},
					
					{
						"text": new Text(`Sản phẩm nổi bật tháng này: ${laptop.name}`)
	
					},
					{
						"card": new Card("Laptop", laptop.name, laptop.image,[laptop.name])
					}
				]
			}
		}
		else if(before === "Trạng thái sản phẩm"){
			res = {
				"fulfillmentMessages": [
					{
						"text": new Text("Sorry bạn nha, sản phẩm tạm thời đã hết hàng")
	
					},
					{
						"text": new Text(`Bạn xem sản phẩm tháng này nhé`)
					},
					
					{
						"text": new Text(`Sản phẩm nổi bật tháng này:`)
	
					},
					{
						"card": new Card("Laptop", laptop.name, laptop.image,[laptop.name])
					}
				]
			}
		}
		else res = {
			"fulfillmentMessages": [
				{
					"text": new Text(`Sản phẩm nổi bật tháng này:`)

				},
				{
					"card": new Card("Laptop", laptop.name, laptop.image,[laptop.name])
				}
			]
		}
		return res
	}
	if (intent === "Tìm kiếm sản phẩm") {
		function getNumber(num) {
			if (num[num.length - 1] == "M" || num[num.length - 1] == "m") {
				num = parseInt(num.replace("M", "").replace("m", "")) * Math.pow(10, 6)
			}
			if (num[num.length - 1] == "K" || num[num.length - 1] == "k") {
				num = parseInt(num.replace("K", "").replace("k", "")) * Math.pow(10, 3)
			}
			return num
		}
		let sql = {}
		let ram = req.queryResult.parameters.ram.replace("gb", "GB")
		let cpu = req.queryResult.parameters.cpu
		let number = getNumber(req.queryResult.parameters.number)
		let number1 = getNumber(req.queryResult.parameters.number1)
		let number2 = getNumber(req.queryResult.parameters.number2)
		let company = req.queryResult.parameters.company

		if (ram != "") sql = { ...sql, ram: ram }
		if (cpu != "") sql = { ...sql, cpu: cpu }
		if (number != "") sql = {
			...sql,
			price: {
				[Op.gt]: number - 2000000,
				[Op.lte]: number + 2000000
			}
		}
		if (number1 != "" && number2 != "") sql = {
			...sql,
			price: {
				[Op.gt]:Math.min(number1, number2),       // > 6                         // >= 6
				[Op.lt]: Math.max(number1, number2)
			}
		}
		if (number1 == "" && number2 != "") sql = {
			...sql,
			price: {
				[Op.gt]:number2 - 2000000,       // > 6                         // >= 6
				[Op.lt]: number2 + 2000000
			}
		}
		let data = []
		let laptop = await LaptopDAO.findAll({ where: sql })

		if (laptop.length == 0) {
			res = {
				"fulfillmentMessages": [{
					"text": new Text("Không có sản phẩm như bạn mong muốn")
				}]
			}
			return res
		}
		laptop.forEach(value => {
			data = [
				...data,
				{
					"text": new Text(value.name)
				},
				{
					"card": new Card("Laptop", value.name, value.image,[value.name])
				},
				{
					"text": new Text(`CPU: ${value.cpu}, RAM: ${value.ram}`)
				},
				{
					"text": new Text(`Giá: ${value.price}`)
				}
			]
		})
		res = {
			"fulfillmentMessages": data
		}
		return res
	}
}
