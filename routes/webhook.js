var route = require('express').Router()
const createResponseFulfillment = require('../modules/webhook')

route.post("/", async (req, res) => {
	let fulfillmentMessages = await createResponseFulfillment(req)
	res.json({ fulfillmentMessages })
})

module.exports = route