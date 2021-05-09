const cart = (sequelize, DataType) => {
	const Cart = sequelize.define(
		"cart",
		{
			id: {
				type: DataType.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		}
	);

	const User = sequelize.models.user;

	User.hasOne(Cart, {
		foriegnKey: {
			type: DataType.UUID,
			allowNull: false,
		},
	});
	Cart.belongsTo(User);

	Cart.sync();

	return Cart;
};

export default cart;
