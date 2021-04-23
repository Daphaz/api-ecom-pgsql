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

	Category.sync();

	return Category;
};

export default category;
