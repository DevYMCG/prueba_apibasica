module.exports = (sequelize, DataTypes) => {
	const Payment = sequelize.define("Payment", {
		amount: {
			type: DataTypes.FLOAT,
		},
		date: {
			type: DataTypes.DATE,
		}
	});

	Payment.associate = models => {
		Payment.belongsTo(models.School, {
			foreignkey: {
				allowNull: false
			}
		});
	};

	return Payment;
};