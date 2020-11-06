module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		loginname: {
			type: DataTypes.STRING(30),
			allowNull: false,
			unique: true
		},
		surname: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		session: {
			type: DataTypes.INTEGER(11),
		},
		url: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.STRING(2),
		}
	});
	
	return User;
};