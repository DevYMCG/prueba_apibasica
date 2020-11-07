module.exports = (sequelize, DataTypes) => {
	const Theme = sequelize.define("Theme", {
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		}
	});
	
	return Theme;
};