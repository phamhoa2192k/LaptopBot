var db = require('../modules/database')
const { DataTypes } = require('sequelize');

var BillDAO = db.define("bill", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		defaultValue:1
	},
	email: {
		type: DataTypes.STRING
	},
	phone: {
		type: DataTypes.STRING
	},
	address: {
		type: DataTypes.STRING
	},
	name: {
		type: DataTypes.STRING
	},

}, {
	timestamps: false
})

module.exports = BillDAO