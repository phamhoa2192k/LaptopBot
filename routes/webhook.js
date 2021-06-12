var route = require('express').Router()
const createResponseFulfillment = require('../modules/webhook')

route.post("/", async (req, res) => {
	let data = await createResponseFulfillment(req.body)
	res.json(data)
})

module.exports = route