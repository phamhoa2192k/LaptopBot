const  {Sequelize}  = require("sequelize");

var db = new Sequelize(process.env.DATABASENAME, process.env.DATABASEUSERNAME, process.env.DATABASEPASSWORD, {
	host: process.env.DATABASEHOST,
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
});

module.exports = db