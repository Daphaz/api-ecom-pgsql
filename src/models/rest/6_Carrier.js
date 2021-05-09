const carrier = (sequelize, DataType) => {
	const Carrier = sequelize.define(
		"carrier",
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
			description: {
				type: DataType.TEXT,
				allowNull: false,
			},
			price: {
				type: DataType.DOUBLE,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		}
	);

	Carrier.sync();

	return Carrier;
};

export default carrier;
