const cart = (sequelize, DataType) => {
	const Cart = sequelize.define(
		"cart",
		{
			id: {
				type: DataType.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			userId: {
				type: DataType.UUID,
				allowNull: false,
			},
			products: {
				type: DataType.ARRAY(DataType.JSONB),
				allowNull: true,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		}
	);

	Cart.sync();

	return Cart;
};

export default cart;
