module.exports = (sequelize, DataTypes) => {
	const Multimedia = sequelize.define("Multimedia", {
		name: {
			type: DataTypes.STRING(30),
		},
		url: {
			type: DataTypes.STRING,
		}

	});

	Multimedia.associate = models => {
		Multimedia.belongsTo(models.Types_multimedia, {
				foreignkey: {
					allowNull: false
				}
		});

		Multimedia.hasMany(models.Game, {
			onDelete: "cascade"
		});

		Multimedia.hasMany(models.Games_theme, {
			onDelete: "cascade"
		});

		Multimedia.hasMany(models.Theme, {
			onDelete: "cascade"
		});
	};

	return Multimedia;
};