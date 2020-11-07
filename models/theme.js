module.exports = (sequelize, DataTypes) => {
	const Theme = sequelize.define("Theme", {
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		}
	});

	Theme.associate = models => {
		Theme.belongsTo(models.Level, {
				foreignkey: {
					allowNull: false
				}
		});

		Theme.hasMany(models.Challenge, {
			onDelete: "cascade"
		});

		Theme.hasMany(models.Lesson, {
			onDelete: "cascade"
		});

		Theme.hasMany(models.Games_theme, {
			onDelete: "cascade"
		});

		Theme.belongsTo(models.Multimedia, {
			 foreignKey: 'MultimediaId_audio',
			 allowNull: false
		});
	};
	
	return Theme;
};