const orderDetails = (sequelize, DataType) => {
	const OrderDetails = sequelize.define(
		"orderDetails",
		{
			id: {
				type: DataType.UUID,
				defaultValue: DataType.UUIDV4,
				primaryKey: true,
			},
			orderId: {
				type: DataType.UUID,
				allowNull: false,
			},
			product: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			quantity: {
				type: DataType.INTEGER,
				allowNull: false,
			},
			price: {
				type: DataType.DOUBLE,
				allowNull: false,
			},
			total: {
				type: DataType.DOUBLE,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		}
	);

	OrderDetails.sync();

	return OrderDetails;
};

export default orderDetails;
