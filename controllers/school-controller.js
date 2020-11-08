const db = require('../models');
var validator = require('validator');
const bcrypt = require('bcrypt');

var controller = {

	save: function(req, res){

		// Recoger los parametros de la peticion
		var params = req.body;

		try{
			var validate_name = !validator.isEmpty(params.name);
			var validate_email = !validator.isEmpty(params.email);
			var validate_address = !validator.isEmpty(params.address);
			var validate_telephone = !validator.isEmpty(params.telephone);
		}catch(err){
			return res.status(200).send({
				message: 'Faltan datos por enviar'
			});
		}

		if( validate_name  && validate_email  && validate_address && validate_telephone){
			// Crear objeto del representante
			var school = new db.School();

			// Asignar valores al representante
			school.rut = params.rut;
			school.name = params.name;
			school.email = params.email;
			school.address = params.address;
			school.telephone = params.telephone;
			school.url = params.url;
			school.color = "#FFFFFF";
			school.status = 'A';
			school.date_last_data = params.date_last_data;
			school.fee = params.fee;
			school.solvency = 'A';

			school.save().then(function(newSchool, created){
				if(!newSchool){
					return res.status(200).send({
					message: 'La Institucion no se ha guardado'
					});
				}

				// Devolver respuesta
				return res.status(200).send({
					status: 'success',
					school: newSchool
				});						
			});	

			// Devolver respuesta
		}else{
			return res.status(200).send({
			message: 'La validacion de los datos son incorrectos, intentalo de nuevo'
			});
		}
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