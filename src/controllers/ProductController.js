const db = require("../models");
const { slugify } = require("../helpers");
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
	const { name, slug, subtitle, description, price } = req.body;

	const image = req.file.filename;

	if (!image) {
		return res.status(400).send({
			status: false,
			type: "image",
			message: "check your input images",
		});
	}

	if (!name && !slug && !subtitle && !description && !price) {
		return res.status(400).send({
			status: false,
			type: "request",
			message: "We need some parameter",
		});
	}

	try {
		const newSlug = slugify(slug);
		const product = await Product.create({
			name,
			slug: newSlug,
			illustration: image,
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
		const product = await Product.findOne({
			where: {
				id,
			},
		});

		const category = await Category.findOne({
			raw: true,
			where: {
				id: categoryId,
			},
		});

		product.categoryId = category.id;

		product.save();

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

exports.setIsBest = async (req, res) => {
	const { id } = req.params;

	try {
		const product = await Product.findOne({
			where: {
				id,
			},
		});

		product.isBest = product.isBest === 0 ? 1 : 0;

		product.save();

		res.send({
			status: true,
			message: `Product ${id} marked isBest`,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.updateProduct = async (req, res) => {
	const { name, slug, illustration, subtitle, description, price } = req.body;
	const { id } = req.params;

	if (!name || !slug || !illustration || !subtitle || !description || !price) {
		return res.status(400).send({
			status: false,
			type: "request",
			message: "We need some parameter",
		});
	}

	try {
		const product = await Product.findOne({
			where: {
				id,
			},
		});

		if (name) {
			product.name = name;
		}
		if (slug) {
			product.slug = slug;
		}
		if (illustration) {
			product.illustration = illustration;
		}
		if (subtitle) {
			product.subtitle = subtitle;
		}
		if (description) {
			product.description = description;
		}
		if (price) {
			product.price = price;
		}

		product.save();

		res.status(201).send({
			status: true,
			message: `Product ${id} was updated`,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.deleteProduct = async (req, res) => {
	const { id } = req.body;

	if (!id) {
		res.status(400).send({
			status: false,
			type: "request",
			message: "Product not found",
		});
	}

	try {
		const product = await Product.findOne({
			where: {
				id,
			},
		});

		await product.destroy();

		return res.send({
			status: true,
			message: `Product ${id} has been deleted !`,
		});
	} catch (err) {
		res.status(500).send({
			message: `Error: ${err.message}`,
		});
	}
};
