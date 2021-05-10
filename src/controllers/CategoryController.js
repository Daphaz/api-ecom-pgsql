const db = require("../models");
const Category = db.rest.models.category;
const Product = db.rest.models.product;
import { capitalizeFirstLetter } from "../helpers";

exports.getCategoryById = async (req, res) => {
	const { id } = req.params;

	console.log(id);

	try {
		const category = await Category.findOne({
			where: {
				id,
			},
		});

		if (category) {
			res.send({
				status: true,
				message: "found category",
				data: category,
			});
		}

		return res.send({
			status: false,
			message: "Not found category",
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.findAll({ raw: true });

		if (categories.length > 0) {
			res.send({
				status: true,
				message: "found all categories",
				data: categories,
			});
		}

		return res.send({
			status: false,
			message: "Not found categories",
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

	const nameFormat = capitalizeFirstLetter(name);

	try {
		const categoryExist = await Category.findOne({
			raw: true,
			where: {
				name: nameFormat,
			},
		});

		if (categoryExist) {
			return res.status(401).send({
				status: false,
				type: "name",
				message: "This name already exist",
			});
		}

		const category = await Category.create({ name: nameFormat });

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

		const nameFormat = capitalizeFirstLetter(name);

		const products = await Product.findAll({
			where: { category: category.name },
		});

		const ids = products.map((product) => product.id);

		Product.update({ category: nameFormat }, { where: { id: ids } });

		category.name = nameFormat;

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

	try {
		const category = await Category.findOne({
			where: {
				id,
			},
		});

		const products = await Product.findAll({
			where: { category: category.name },
		});

		const ids = products.map((product) => product.id);

		Product.update({ category: null }, { where: { id: ids } });

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
