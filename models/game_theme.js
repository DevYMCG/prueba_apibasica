module.exports = (sequelize, DataTypes) => {
	const Games_theme = sequelize.define("Games_theme", {
		name_ask: {
			type: DataTypes.STRING(30),
		},
		name_compare: {
			type: DataTypes.STRING(30),
		}
	});

	Games_theme.associate = models => {

		Games_theme.belongsTo(models.Theme, {
				foreignkey: {
					allowNull: false
				}
		});

		Games_theme.belongsTo(models.Game, {
				foreignkey: {
					allowNull: false
				}
		});

		Games_theme.belongsTo(models.Multimedia, {
			 foreignKey: 'MultimediaId_audio',
			 allowNull: false
		});

	};

	return Games_theme;
};