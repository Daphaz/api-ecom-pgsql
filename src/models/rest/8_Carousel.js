const carousel = (sequelize, DataType) => {
	const Carousel = sequelize.define(
		"carousel",
		{
			id: {
				type: DataType.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: DataType.STRING(255),
				allowNull: true,
			},
			content: {
				type: DataType.TEXT,
				allowNull: true,
			},
			btn_title: {
				type: DataType.STRING(255),
				allowNull: true,
			},
			btn_url: {
				type: DataType.STRING(255),
				allowNull: true,
			},
			illustration: {
				type: DataType.STRING(255),
				allowNull: false,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		}
	);

	Carousel.sync();

	return Carousel;
};

export default carousel;
