const db = require('../models');

var controller = {

	save: function(req, res){
		db.School.create({
		 rut: req.body.rut,
		 name: req.body.name,
		 picture: req.body.email,
		 address: req.body.address,
		 telephone: req.body.telephone,
		 url: req.body.url,
		 color: req.body.color,
		 status: req.body.status,
		 date_last_data: req.body.date_last_data,
		 fee: req.body.fee,
		 solvency: req.body.solvency
		}).then(newSchool => res.send(newSchool));
	},

	getSchools: function(req, res){
		db.School.findAll({
		}).then(allSchools => res.send(allSchools));
	},

	getSchool: function(req, res){
		db.School.findAll({
		 where: { id: req.params.id }
		}).then(school => res.send(school));
	},

}

module.exports = controller;