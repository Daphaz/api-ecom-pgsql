const user = (sequelize, DataType) => {
	const User = sequelize.define(
		"user",
		{
			id: {
				type: DataType.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			email: {
				type: DataType.STRING(180),
				allowNull: false,
				unique: true,
			},
			roles: {
				type: DataType.TEXT,
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

	User.sync();
	return User;
};

export default user;
