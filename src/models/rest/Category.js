const category = (sequelize, DataType) => {
	const Category = sequelize.define(
		"category",
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
		},
		{
			timestamps: true,
			freezeTableName: true,
		}
	);

	Category.sync();

	Category.associate = (models) => {
		Category.hasMany(models.product, {
			foreignKey: {
				name: "product_id",
				allowNull: true,
			},
		});
	};

	return Category;
};

export default category;
