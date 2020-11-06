module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		loginname: {
			type: DataTypes.STRING(30),
			allowNull: false,
			unique: true
		},
		surname: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		session: {
			type: DataTypes.INTEGER(11),
		},
		url: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.STRING(2),
		}
	});

	User.associate = models => {
		User.belongsTo(models.Role, {
			foreignkey: {
				allowNull: false
			}
		});

		User.belongsTo(models.Parent, {
			foreignkey: {
				allowNull: false
			}
		});

		User.belongsTo(models.School, {
			foreignkey: {
				allowNull: false
			}
		});

		User.hasMany(models.Users_Level, {
			onDelete: "cascade"
		});

		User.hasMany(models.Challenge, {
			onDelete: "cascade"
		});
	};

	return User;
};