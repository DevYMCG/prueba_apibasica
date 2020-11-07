module.exports = (sequelize, DataTypes) => {
	const Level = sequelize.define("Level", {
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		}
	});

	Level.associate = models => {
		Level.hasMany(models.Users_Level, {
			onDelete: "cascade"
		});

		Level.hasMany(models.Theme, {
			onDelete: "cascade"
		});
	};

	return Level;
};