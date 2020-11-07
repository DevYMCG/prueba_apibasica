module.exports = (sequelize, DataTypes) => {
	const Level = sequelize.define("Level", {
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		}
	});

	return Level;
};