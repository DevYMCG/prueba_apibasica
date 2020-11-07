module.exports = (sequelize, DataTypes) => {
	const Game = sequelize.define("Game", {
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		}

	});
	
	Game.associate = models => {
		Game.hasMany(models.Lesson, {
			onDelete: "cascade"
		});

		Game.hasMany(models.Games_theme, {
			onDelete: "cascade"
		});

		Game.belongsTo(models.Multimedia, {
			 foreignKey: 'MultimediaId_video',
			 allowNull: false
		});
	};
	
	return Game;
};