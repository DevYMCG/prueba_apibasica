module.exports = (sequelize, DataTypes) => {
	const Parent = sequelize.define("Parent", {
		loginname: {
			type: DataTypes.STRING(30),
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false,
			validate: {
				notEmpty: {msg: "Faltan datos por ingresar"}
			}
		},
		surname: {
			type: DataTypes.STRING(30),
			allowNull: false,
			validate: {
				notEmpty: {msg: "Faltan datos por ingresar"}
			}
		},
		email: {
			type: DataTypes.STRING,
			unique: true
		}
	});

	return Parent;
};