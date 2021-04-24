const product = (sequelize, DataType) => {
	const Product = sequelize.define(
		"product",
		{
			id: {
				type: DataType.UUID,
				defaultValue: DataType.UUIDV4,
				primaryKey: true,
			},
			categoryId: {
				type: DataType.UUID,
			},
			name: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			slug: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			illustration: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			subtitle: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			description: {
				type: DataType.TEXT,
				allowNull: false,
			},
			price: {
				type: DataType.DOUBLE,
				allowNull: false,
			},
			isBest: {
				type: DataType.SMALLINT,
				defaultValue: 0,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		}
	);

	Product.sync();

	return Product;
};

export default product;
