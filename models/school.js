module.exports = (sequelize, DataTypes) => {
	const School = sequelize.define("School", {
		rut: {
			type: DataTypes.STRING(30),
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		picture: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			unique: true
		},
		address:{
			type: DataTypes.STRING(100),
			allowNull: false
		},
		telephone: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		url: {
			type: DataTypes.STRING
		},
		color: {
			type: DataTypes.STRING(8)
		},
		status: {
			type: DataTypes.STRING(2),
			allowNull: false
		},
		date_last_data: {
			type: DataTypes.DATE
		},
		fee: {
			type: DataTypes.FLOAT
		},
		solvency: {
			type: DataTypes.STRING(2)
		}
	});

		School.associate = models => {
			School.hasMany(models.User, {
				onDelete: "cascade"
		});

		School.hasMany(models.Challenge, {
			onDelete: "cascade"
		});
	};

	return School;
};