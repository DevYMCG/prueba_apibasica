module.exports = (sequelize, DataTypes) => {
	const Challenge = sequelize.define("Challenge", {
		date: {
			type: DataTypes.DATE,
		},
		status: {
			type: DataTypes.STRING(2)
		}

	});
	
	Challenge.associate = models => {
		Challenge.belongsTo(models.User, {
				foreignkey: {
					allowNull: false
				}
		});

		Challenge.belongsTo(models.School, {
				foreignkey: {
					allowNull: false
				}
		});

		Challenge.belongsTo(models.Theme, {
				foreignkey: {
					allowNull: false
				}
		});
	};

	return Challenge;
};