module.exports = (sequelize, DataTypes) => {
	const Challenge = sequelize.define("Challenge", {
		date: {
			type: DataTypes.DATE,
		},
		status: {
			type: DataTypes.STRING(2)
		}

	});

	return Challenge;
};