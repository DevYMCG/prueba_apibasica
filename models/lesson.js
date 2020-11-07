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

	return Lesson;
};