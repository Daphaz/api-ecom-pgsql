const resetPassword = (sequelize, DataType) => {
	const ResetPassword = sequelize.define(
		"resetPassword",
		{
			id: {
				type: DataType.UUID,
				defaultValue: DataType.UUIDV4,
				primaryKey: true,
			},
			userId: {
				type: DataType.UUID,
				allowNull: false,
				unique: true,
			},
			token: {
				type: DataType.STRING(255),
				allowNull: false,
			},
			status: {
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

	ResetPassword.sync();

	return ResetPassword;
};

export default resetPassword;
