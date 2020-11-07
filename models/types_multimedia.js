module.exports = (sequelize, DataTypes) => {
	const Types_multimedia = sequelize.define("Types_multimedia", {
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		}

	});

	return Types_multimedia;
};