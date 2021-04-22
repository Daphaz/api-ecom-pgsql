const product = (sequelize, DataType) => {
	const Product = sequelize.define(
		"product",
		{
			id: {
				type: DataType.INTEGER,
				primaryKey: true,
				autoIncrement: true,
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
				allowNull: false,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		}
	);

	Product.sync();

	Product.associate = (models) => {
		Product.belongsTo(models.category, {
			onDelete: "cascade",
			as: "category_id",
			constraint: false,
		});
	};

	return Product;
};

export default product;
