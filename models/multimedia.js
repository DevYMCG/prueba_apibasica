module.exports = (sequelize, DataTypes) => {
	const Multimedia = sequelize.define("Multimedia", {
		name: {
			type: DataTypes.STRING(30),
		},
		url: {
			type: DataTypes.STRING,
		}

	});

	return Multimedia;
};