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
	
	return Role;
};