const db = require("../models");
const Product = db.rest.models.product;
const Category = db.rest.models.category;

exports.getProducts = async (req, res) => {
	try {
		const products = await Product.findAll({ raw: true });

		if (products.length > 0) {
			return res.send({
				status: true,
				message: "get all products",
				data: products,
			});
		}

		return res.status(400).send({
			status: false,
			type: "request",
			message: "Don't find any products",
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.createProduct = async (req, res) => {
	const { name, slug, illustration, subtitle, description, price } = req.body;

	if (!name && !slug && !illustration && !subtitle && !description && !price) {
		return res.status(400).send({
			status: false,
			type: "request",
			message: "We need some parameter",
		});
	}

	try {
		const product = await Product.create({
			name,
			slug,
			illustration,
			subtitle,
			description,
			price,
		});

		res.status(201).send({
			status: true,
			message: "product sucessfull created",
			data: product,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.setCategoryProduct = async (req, res) => {
	const { categoryId } = req.body;
	const { id } = req.params;

	try {
		const category = await Category.findOne({
			where: {
				id: categoryId,
			},
		});

		const product = await Product.findOne({
			where: {
				id,
			},
			include: [{ model: category }],
		});

		res.send({
			status: true,
			message: `Categorie ${categoryId} was added`,
			data: product,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.updateProduct = async (req, res) => {};

exports.deleteProduct = async (req, res) => {};
