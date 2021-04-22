const category = (sequelize, DataType) => {
	const Category = sequelize.define(
		"category",
		{
			id: {
				type: DataType.UUID,
				defaultValue: DataType.UUIDV4,
				primaryKey: true,
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

	Category.associate = (models) => {
		Category.hasMany(models.product, {
			onDelete: "cascade",
			foriegnKey: {
				type: DataType.UUID,
				allowNull: false,
			},
		});
	};

	Category.sync({ alter: true });

	return Category;
};

export default category;
