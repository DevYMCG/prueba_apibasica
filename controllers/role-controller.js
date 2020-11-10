const db = require('../models');
var validator = require('validator');

var controller = {

	save: function(req, res){

		// Recoger los parametros de peticion
		var params = req.body;
		// Validar los datos
		try{
			var validator_name = !validator.isEmpty(params.name);
		}catch(err){
			return res.status(400).send({
				message: 'Faltan datos por enviar'
			});
		}

		if(validator_name){
			// Guadar el role

			//crear objeto del rol 
			var role = new db.Role();

			// Asignar valores al rol 
			role.name = params.name;

			role.save().then(function(newRole, created){
				if(!newRole){
					return res.status(200).send({
						message: 'El rol no se ha guardado'
					});
				}

				// Devolver respuesta
				return res.status(201).send({
					status: 'success',
					Role: newRole
				});
			});


		}else{
			return res.status(400).send({
			message: 'Validación de los datos del usuario, incorrecta'
			});
		}
	},

	getRole: function(req, res){
		db.Role.findAll({
		 where: { id: req.params.id }
		}).then(role => res.send(role));
	},

	// obtener todos los roles de la base de datos

	getRoles: function(req, res){
		db.Role.findAll({
		}).then(allroles => res.send(allroles));
	},

	delete: function(req, res){

		// Sacar el id del post de la url
		var topicId = req.params.id;

		// Delete the role
		db.Role.destroy({
			where: {
				id: topicId
			}
		}).then((roleRemoved) => {

			if(!roleRemoved){                                        
				return res.status(404).send({
					status: 'Error',
					message: 'El usuario no existe'
				});
			}

			//Devolver una respuesta
			return res.status(200).send({
				message: 'Eliminado correct',
				role: roleRemoved
			});

		});
	}

}

module.exports = controller;