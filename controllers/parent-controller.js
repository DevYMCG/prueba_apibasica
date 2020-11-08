const db = require('../models');
var validator = require('validator');
const bcrypt = require('bcrypt');

var controller = {

	save: function(req, res){

		// Recoger los parametros de la peticion
		var params = req.body;

		// Validar los datos
		try{
			var validate_name = !validator.isEmpty(params.name);
			var validate_surname = !validator.isEmpty(params.surname);
			var validate_email = validator.isEmail(params.email);
		}catch(err){
			return res.status(400).send({
				message: 'Faltan datos por enviar'
			});
		}

		if( validate_surname && validate_name && validate_email){
			// Crear objeto del representante
			var parent = new db.Parent();

			// Asignar valores al representante
			parent.surname = params.surname;
			parent.name = params.name;
			parent.email = params.email;

			parent.save().then(function(newParent, created){
				if(!newParent){
					return res.status(200).send({
					message: 'El representante no se ha guardado'
					});
				}

				// Devolver respuesta
				return res.status(201).send({
					status: 'success',
					Parent: newParent
				});						
			});	

			// Devolver respuesta
		}else{
			return res.status(400).send({
			message: 'Validación de los datos del usuario, incorrecta'
			});
		}
	},
	
	getParent: function(req, res){
		db.Parent.findAll({
		 where: { id: req.params.id }
		}).then(parent => res.send(parent));
	},

	getParents: function(req, res){
		db.Parent.findAll({
		}).then(allParents => res.send(allParents));
	},
}

module.exports = controller;