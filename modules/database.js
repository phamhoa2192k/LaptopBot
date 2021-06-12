const  {Sequelize}  = require("sequelize");

var db = new Sequelize('pj', 'root', '210920', {
	host: 'localhost',
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
});

module.exports = db