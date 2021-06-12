const LaptopDAO = require('../dao/LaptopDAO')
const { createEnity } = require('../modules/create')
const Entity = require("../model/Entity")
var route = require('express').Router()

route.get("/", (req, res) => {
	res.render("admin")
})

route.get("/update", async (req, res) => {
	let laps = await LaptopDAO.findAll()
	let entity = laps.map(value => (new Entity(value.dataValues.name)))
	createEnity(entity)
})

module.exports = route