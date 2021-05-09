const db = require("../models");
const { slugify } = require("../helpers");
const Product = db.rest.models.product;
const Category = db.rest.models.category;

exports.getProductBySlug = async (req, res) => {
	const { slug } = req.query;

	try {
		const product = await Product.findOne({
			where: {
				slug,
			},
		});

		if (product) {
			return res.send({
				status: true,
				message: "found product",
				data: product,
			});
		}

		return res.send({
			status: false,
			message: "Not found product",
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.getProductById = async (req, res) => {
	const { id } = req.params;

	try {
		const product = await Product.findOne({
			where: {
				id,
			},
		});

		if (product) {
			return res.send({
				status: true,
				message: "found product",
				data: product,
			});
		}

		return res.send({
			status: false,
			message: "Not found product",
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

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

		return res.send({
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

exports.filterProduct = async (req, res) => {
	const { search, category } = req.query;

	const products = await Product.findAll({ raw: true });

	if (search && !category) {
		const reg = search.match("/^[0-9]|[a-z]|[A-Z]$/")
			? new RegExp(`${search}`, "i")
			: new RegExp("''", "i");
		const filter = products.filter((p) => reg.test(p.subtitle));

		return res.send({
			status: true,
			data: filter,
		});
	}

	if (!search && category) {
		const newProducts = await Product.findAll({
			where: { category: category },
		});

		return res.send({
			status: true,
			data: newProducts,
		});
	}

	if (search && category) {
		const newProducts = await Product.findAll({
			where: { category: category },
		});
		const reg = search.match("/^[0-9]|[a-z]|[A-Z]$/")
			? new RegExp(`${search}`, "i")
			: new RegExp("''", "i");
		const filter = newProducts.filter((p) => reg.test(p.subtitle));

		return res.send({
			status: true,
			data: filter,
		});
	}

	return res.send({
		status: true,
		data: products,
	});
};

exports.createProduct = async (req, res) => {
	const {
		name,
		slug,
		subtitle,
		description,
		price,
		featured,
		category,
	} = req.body;

	const isBest = featured === "true" ? 1 : 0;
	const categoryName = category !== "" ? category : null;

	if (!req.file) {
		return res.status(400).send({
			status: false,
			type: "image",
			message: "check your input images",
		});
	}

	const image = req.file.filename;

	if (!image) {
		return res.status(400).send({
			status: false,
			type: "illustration",
			message: "check your input images",
		});
	}

	if (!name && !slug && !subtitle && !description && !price) {
		return res.status(400).send({
			status: false,
			type: "category",
			message: "We need some parameter",
		});
	}

	const newSlug = slugify(slug);

	if (slug !== newSlug) {
		return res.status(400).send({
			status: false,
			type: "slug",
			message: "the slug don't have space or spécial caracter",
		});
	}

	try {
		const product = await Product.create({
			name,
			slug,
			illustration: image,
			subtitle,
			description,
			price,
			isBest,
			category: categoryName,
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
	const {
		name,
		slug,
		illustration,
		subtitle,
		description,
		price,
		featured,
		category,
	} = req.body;
	const { id } = req.params;

	if (!name || !slug || !subtitle || !description || !price) {
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
		if (!illustration) {
			const image = req.file.filename;
			product.illustration = image;
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
		if (featured) {
			const isBest = featured === "true" ? 1 : 0;
			product.isBest = isBest;
		}
		if (category) {
			const categoryName = category !== "" ? category : null;
			product.category = categoryName;
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

exports.getProductsIsBest = async (req, res) => {
	try {
		const products = await Product.findAll({ raw: true, where: { isBest: 1 } });

		if (products.length > 0) {
			return res.send({
				status: true,
				message: "get all products",
				data: products,
			});
		}

		return res.send({
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
