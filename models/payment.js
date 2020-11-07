module.exports = (sequelize, DataTypes) => {
	const Payment = sequelize.define("Payment", {
		amount: {
			type: DataTypes.FLOAT,
		},
		date: {
			type: DataTypes.DATE,
		}
	});

	return Payment;
};