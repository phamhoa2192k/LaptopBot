var db = require('../modules/database')
const { DataTypes } = require('sequelize');

var LaptopDAO = db.define("laptop", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING
	},
	cpu: {
		type: DataTypes.STRING
	},
	ram: {
		type: DataTypes.STRING
	},
	price: {
		type: DataTypes.INTEGER
	},
	image: {
		type: DataTypes.STRING
	},
	other: {
		type: DataTypes.STRING
	},
	promotion: {
		type: DataTypes.STRING
	},
	quantity: {
		type: DataTypes.INTEGER
	},
	detail: {
		type: DataTypes.STRING
	},
	company: {
		type: DataTypes.STRING
	}

}, {
	timestamps: false
})

module.exports = LaptopDAO