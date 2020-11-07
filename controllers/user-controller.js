const db = require('../models');
var validator = require('validator');
const bcrypt = require('bcrypt');

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
		}catch(err){
			return res.status(200).send({
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
			user.ParentId = params.ParentId;
			user.RoleId = params.RoleId;
			user.SchoolId = params.SchoolId;

			// Comprobar si el usuario existe
			db.User.findOne({
				where: {
					loginname: user.loginname
				}
			}).then(function(issetUser){

				if(issetUser){
					return res.status(500).send({
						message: 'El loginname ya existe'
					});
				}else{
					// Si no existe, cifrar la contraseña y guardar
					bcrypt.hash(params.password, 10, function(err, hash){
					user.password = hash;
					//guardar usuario 

					user.save().then(function(newUser, created){
						if(!newUser){
							return res.status(200).send({
							message: 'El usuario no se ha guardado'
							});
						}

					// Devolver respuesta
					return res.status(200).send({
						status: 'success',
						user: newUser
					});						
				});
				
				});
				}
		 })
		}else{
			return res.status(200).send({
			message: 'La validacion de los datos son incorrectos, intentalo de nuevo'
			});
		}
	}

}
module.exports = controller;