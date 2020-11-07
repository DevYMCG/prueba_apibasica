module.exports = (sequelize, DataTypes) => {
	const Role = sequelize.define("Role", {
		name: {
			type: DataTypes.STRING(30),
			allowNull: false,
			validate: {
				notEmpty: {msg: "Faltan datos por ingresar"}
			}
		}
	});

	Role.associate = models => {
		Role.hasMany(models.User, {
			onDelete: "cascade"
		});
	};
	
	return Role;
};