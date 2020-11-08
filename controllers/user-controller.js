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
			var validate_surname = !validator.isEmpty(params.surname);
			var validate_name = !validator.isEmpty(params.name);
			var validate_password = !validator.isEmpty(params.password);
			var validate_parent = !validator.isEmpty(params.parentId);
			var validate_role = !validator.isEmpty(params.roleId);
			var validate_school = !validator.isEmpty(params.schoolId);

		}catch(err){
			return res.status(400).send({
				message: 'Faltan datos por enviar'
			});
		}

		if(validate_loginname && validate_surname && validate_name && validate_password){
			// Crear objeto de usuario
			var user = new db.User();

			// Asignar valores de usuario
			user.loginname = params.loginname;
			user.surname = params.surname;
			user.name = params.name;
			user.password = params.password;
			user.session = 0;
			user.url = params.url;
			user.status = 'A';
			user.ParentId = params.parentId;
			user.RoleId = params.roleId;
			user.SchoolId = params.schoolId;

			// Comprobar si el usuario existe
			db.User.findOne({
				where: {
					loginname: user.loginname
				}
			}).then(function(issetUser){

				if(issetUser){
					return res.status(500).send({
						message: 'Error al comprobar duplicidad del loginname'
					});
				}else{
					// Si no existe, cifrar la contraseña y guardar
					bcrypt.hash(params.password, 10, function(err, hash){
					user.password = hash;
					//guardar usuario 

					user.save().then(function(newUser, created){
						if(!newUser){
							return res.status(400).send({
							message: 'El usuario no se ha guardado'
							});
						}
					// Limpiar el objto
					user.password = undefined;
					user.session = undefined;
					user.status = undefined;

					// Devolver respuesta
					return res.status(201).send({
						status: 'success',
						user: newUser
					});						
				});
				
				});
				}
		 })
		}else{
			return res.status(400).send({
			message: 'Validación de los datos del usuario, incorrecta, intentalo de nuevo'
			});
		}
	},

	login: function(req, res){
		// Recoger los parametros de la peticion
		var params = req.body;

		// Validar los datos
		try{

		var validate_loginame = !validator.isEmpty(params.loginname);
		var validate_password = !validator.isEmpty(params.password);
		}catch(err){
			return res.status(400).send({
						message: 'Faltan datos por enviar'
				});
		}

		if(!validate_loginame || !validate_password){

			return res.status(400).send({
			message: 'Validación de los datos del usuario, incorrecta'
			});
		}

		// Buscar usuarios que coincidan con el loginname

		db.User.findOne({
				where: {
					loginname: params.loginname
				}
			}).then(function(user){

			if(!user){
				return res.status(404).send({
					message: 'El usuario no existe'
				});
			}
			// Si la encuentra,

			//Comprobar la contraseña(coincidencia de loginname y password / bcrypt)
			bcrypt.compare(params.password, user.password, (err, result)=>{

				// Si es correcto,
				if(result){

					// Generar el token de jwt y devolver

					if(params.gettoken){

						return res.status(200).send({
							token: jwt.createToken(user)
						});
					}

					//Limpiar el objeto
					user.password = undefined;

					// Devolver datos

					return res.status(200).send({
						message: 'Metodo de login',
						user: user
					});
				}else{

					return res.status(200).send({
						message: 'Las credenciales no son correctas'
					});
				}

			});

		});
	},

		update: function(req, res){

		// Recoger los datos del usuario
		var params = req.body;

		// Validar los datos 
		try{
			var validate_loginname = !validator.isEmpty(params.loginname);
			var validate_surname = !validator.isEmpty(params.surname);
			var validate_name = !validator.isEmpty(params.name);
			var validate_password = !validator.isEmpty(params.password);
			var validate_parent = !validator.isEmpty(params.parentId);
			var validate_role = !validator.isEmpty(params.roleId);
			var validate_school = !validator.isEmpty(params.schoolId);

		}catch(err){
			return res.status(400).send({
				message: 'Faltan datos por enviar'
			});
		}

		// Eliminar propiedades innecesarias
		delete params.password;

		var userId = req.user.sub;

		// Buscar y actualizar documento 
		db.User.update(params, 
				{ where: { id: userId }
			}).then((result)=>{

				if(!result){
						return res.status(200).send({
						status: 'error',
						message: 'Error al actualizar'
					});
				}

				//Devolver una respuesta
				return res.status(200).send({
					message: 'Metodo de actualizacion de datos',
					params
				});
			});
	},

	getUsers: function(req, res){
		db.User.findAll({
		}).then(allusers => res.send(allusers));
	},

	getUser: function(req, res){
		db.User.findAll({
		 where: { id: req.params.id }
		}).then(users => res.send(users));
	},

}
module.exports = controller;