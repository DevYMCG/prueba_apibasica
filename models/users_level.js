module.exports = (sequelize, DataTypes) => {
	const Users_Level = sequelize.define("Users_Level", {
		progress: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		se_current: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		te_current: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		hour: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		le_current: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		start_date: {
			type: DataTypes.DATE
		},
		academic_year: {
			type: DataTypes.STRING(10)
		},
		final_date:{
			type: DataTypes.DATE
		}
	});

	Users_Level.associate = models => {
		Users_Level.belongsTo(models.Level, {
			foreignkey: {
				allowNull: false
			}
		});

		Users_Level.belongsTo(models.User, {
			foreignkey: {
				allowNull: false
			}
		});


	};


	return Users_Level;
};