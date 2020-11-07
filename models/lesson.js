module.exports = (sequelize, DataTypes) => {
	const Lesson = sequelize.define("Lesson", {
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		previous: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		following: {
			type: DataTypes.STRING(30),
			allowNull: false
		}

	});

	Lesson.associate = models => {
		Lesson.belongsTo(models.Theme, {
				foreignkey: {
					allowNull: false
				}
		});

		Lesson.hasMany(models.Games_theme, {
			onDelete: "cascade"
		});

		Lesson.belongsTo(models.Game, {
				foreignkey: {
					allowNull: false
				}
		});
	};

	return Lesson;
};