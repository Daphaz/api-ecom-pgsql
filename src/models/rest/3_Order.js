const order = (sequelize, DataType) => {
	const Order = sequelize.define(
		"order",
		{
			id: {
				type: DataType.UUID,
				defaultValue: DataType.UUIDV4,
				primaryKey: true,
			},
			userId: {
				type: DataType.UUID,
				allowNull: false,
			},
			carrierName: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			carrierPrice: {
				type: DataType.DOUBLE,
				allowNull: false,
			},
			delivery: {
				type: DataType.TEXT,
				allowNull: false,
			},
			reference: {
				type: DataType.UUID,
				defaultValue: DataType.UUIDV4,
				allowNull: false,
			},
			stripeSessionId: {
				type: DataType.STRING(255),
			},
			state: {
				type: DataType.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		}
	);

	Order.sync();

	return Order;
};

export default order;
