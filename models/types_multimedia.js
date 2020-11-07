module.exports = (sequelize, DataTypes) => {
	const Types_multimedia = sequelize.define("Types_multimedia", {
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		}

	});

	Types_multimedia.associate = models => {

		Types_multimedia.hasMany(models.Multimedia, {
			onDelete: "cascade"
		});
	};

	return Types_multimedia;
};