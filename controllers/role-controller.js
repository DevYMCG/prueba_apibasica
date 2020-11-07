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
			return res.status(200).send({
				message: 'Faltan datos por enviar'
			});
		}

		if(validator_name){
			// Guadar el role
			 db.Role.create({
			  name: params.name
			 }).then(newRole => res.send(newRole));
		}else{
			return res.status(200).send({
			message: 'La validacion de los datos son incorrectos, intentalo de nuevo'
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

}

module.exports = controller;