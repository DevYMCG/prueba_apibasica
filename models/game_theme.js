module.exports = (sequelize, DataTypes) => {
	const Games_theme = sequelize.define("Games_theme", {
		name_ask: {
			type: DataTypes.STRING(30),
		},
		name_compare: {
			type: DataTypes.STRING(30),
		}
	});

	return Games_theme;
};