const address = (sequelize, DataType) => {
	const Address = sequelize.define(
		"address",
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
			name: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			firstname: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			lastname: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			company: {
				type: DataType.STRING(255),
			},
			address: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			postal: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			city: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			country: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			phone: {
				type: DataType.STRING(255),
				allowNull: false,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		}
	);

	Address.sync();

	return Address;
};

export default address;
