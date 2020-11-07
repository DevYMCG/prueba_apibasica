const db = require('../models');
var validator = require('validator');
const bcrypt = require('bcrypt');
var jwt = require('../services/jwt');

var controller = {

	save: function(req, res){

		// Recoger los parametros de la peticion
		var params = req.body;

		// Validar los datos
		try{
			var validate_loginname = !validator.isEmpty(params.loginname);
			var validate_password = !validator.isEmpty(params.password);
			var validate_name = !validator.isEmpty(params.name);
			var validate_surname = !validator.isEmpty(params.surname);
			var validate_email = validator.isEmail(params.email);
		}catch(err){
			return res.status(200).send({
				message: 'Faltan datos por enviar'
			});
		}

		if(validate_loginname && validate_password && validate_surname && validate_name && validate_email){
			// Crear objeto del representante
			var parent = new db.Parent();

			// Asignar valores al representante
			parent.loginname = params.loginname;
			parent.password = params.password;
			parent.surname = params.surname;
			parent.name = params.name;
			parent.email = params.email;
			// Comprobar si el representante existe
			db.Parent.findOne({
				where:{
					loginname: parent.loginname
				}
			}).then(function(issetParent){

				if(issetParent){
					return res.status(500).send({
						message: 'El loginname ya existe'
					});
				}else{
					// Si no existe, cifrar la contraseña y guardar
					bcrypt.hash(params.password, 10, function(err, hash){
					parent.password = hash;
					//guardar parent 

						parent.save().then(function(newParent, created){
							if(!newParent){
								return res.status(200).send({
								message: 'El representante no se ha guardado'
								});
							}

							// Devolver respuesta
							return res.status(200).send({
								status: 'success',
								Parent: newParent
							});						
						});
				  	});
				}
			})

			// Devolver respuesta
		}else{
			return res.status(200).send({
			message: 'La validacion de los datos son incorrectos, intentalo de nuevo'
			});
		}
	},

	login: function(req, res){
		// Recoger los parametros de peticion
		var params = req.body;

		// Validar los datos
		try{

		var validate_loginame = !validator.isEmpty(params.loginname);
		var validate_password = !validator.isEmpty(params.password);
		}catch(err){
			return res.status(200).send({
						message: 'Faltan datos por enviar'
					});
		}

		if(!validate_loginame || !validate_password){

			return res.status(200).send({
			message: 'Los datos son incorrectos'
			});
		}

		// Buscar representantes que coincidan con el loginname

		db.Parent.findOne({
			where: {
				loginname: params.loginname
			}
		}).then(function(parent){

			if(!parent){
				return res.status(404).send({
					message: 'El usuario no existe'
				});
			}

			// si la encuentra

			// Comprobar la contraseña(coincidencia de loginname y password / bcrypt)
			bcrypt.compare(params.password, parent.password, (err, result)=>{
				
				// Si es correcto
				if(result){
					// Genenerar el token de jwt y devolver

					if(params.gettoken){
						return res.status(200).send({
							token: jwt.createToken(parent)
						});
					}

					// Limpiar el objeto
					parent.password = undefined;

					// Devolver datos

					return res.status(200).send({
						message: 'Metodo de login',
						parent: parent
					});
				}else{
					return res.status(200).send({
						message: 'Las credenciales no son correctas'
					});
				}
			});
		});
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