const db = require("../models");
const Category = db.rest.models.category;

exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.findAll({ raw: true });

		if (!categories) {
			return res.send({
				status: false,
				message: "Not found categories",
			});
		}

		res.send({
			status: true,
			message: "found all categories",
			data: categories,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.createCategory = async (req, res) => {
	const { name } = req.body;

	if (!name) {
		return res.status(400).send({
			status: false,
			type: "request",
			message: "Missing some information",
		});
	}

	try {
		const categoryExist = await Category.findOne({
			raw: true,
			where: {
				name,
			},
		});

		if (categoryExist) {
			return res.status(401).send({
				status: false,
				type: "name",
				message: "This name already exist",
			});
		}

		const category = await Category.create({
			name,
			include: [db.product],
		});

		res.send({
			status: true,
			message: "category was successfull created",
			data: category,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.updateCategory = async (req, res) => {
	const { name } = req.body;
	const { id } = req.params;

	if (!name && !id) {
		return res.status(400).send({
			status: false,
			type: "request",
			message: "Missing some information",
		});
	}

	try {
		const category = await Category.findOne({
			where: {
				id,
			},
		});

		if (!category) {
			return res.status(400).send({
				status: false,
				type: "request",
				message: `Category ${id} not found`,
			});
		}

		category.name = name;

		category.save();

		return res.send({
			status: true,
			message: `Category ${id} was updated !`,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.deleteCategory = async (req, res) => {
	const { id } = req.body;

	if (!id) {
		res.status(400).send({
			status: false,
			type: "request",
			message: "Category not found",
		});
	}

	const category = await Category.findOne({
		where: {
			id,
		},
	});

	if (!category) {
		res.status(400).send({
			status: false,
			type: "request",
			message: "Category doesn't exists",
		});
	}

	try {
		await category.destroy();

		return res.send({
			status: true,
			message: `Category ${id} has been deleted !`,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};
