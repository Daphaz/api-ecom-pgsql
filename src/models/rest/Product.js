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
				type: DataType.TEXT("long"),
				allowNull: false,
			},
			price: {
				type: DataType.DOUBLE,
				allowNull: false,
			},
			is_best: {
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

	Product.associate = (models) => {
		Product.belongsTo(models.category);
	};

	Product.sync({ alter: true });

	return Product;
};

export default product;
