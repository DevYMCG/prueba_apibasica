module.exports = (sequelize, DataTypes) => {
	const Game = sequelize.define("Game", {
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		}

	});
	
	return Game;
};