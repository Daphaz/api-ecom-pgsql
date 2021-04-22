const user = (sequelize, DataType) => {
	const User = sequelize.define(
		"user",
		{
			id: {
				type: DataType.UUID,
				defaultValue: DataType.UUIDV4,
				primaryKey: true,
			},
			email: {
				type: DataType.STRING(180),
				allowNull: false,
				unique: true,
			},
			roles: {
				type: DataType.TEXT,
				defaultValue: "user",
			},
			password: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			firstname: {
				type: DataType.STRING(180),
				allowNull: false,
			},
			lastname: {
				type: DataType.STRING(180),
				allowNull: false,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		}
	);

	User.sync({ alter: true });

	return User;
};

export default user;
