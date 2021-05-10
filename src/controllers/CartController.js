const db = require("../models");
const Cart = db.rest.models.cart;
const Product = db.rest.models.product;

module.exports = {
	createCart: async (req, res) => {
		const userId = req.userId;

		try {
			const cartExist = await Cart.findOne({ raw: true, where: { userId } });

			if (cartExist) {
				return res.send({
					status: true,
					message: "Cart already exist",
					data: {
						products: cartExist.products,
					},
				});
			}

			const cart = await Cart.create({ userId });

			return res.send({
				status: true,
				message: "cart was created",
				data: {
					products: cart.products,
				},
			});
		} catch (error) {
			res.status(500).send({
				message: `Error: ${error.message}`,
			});
		}
	},
	addProduct: async (req, res) => {
		const { productId } = req.body;
		const userId = req.userId;

		if (!productId) {
			return res.status(400).send({
				type: "request",
				message: "need some parameter",
			});
		}

		try {
			const product = await Product.findOne({
				raw: true,
				where: { id: productId },
			});

			if (!product) {
				return res.status(400).send({
					type: "request",
					message: "Product not found",
				});
			}

			const cart = await Cart.findOne({
				where: {
					userId,
				},
			});

			console.log("CART: ", product);

			if (cart.products !== null) {
				const productFilter = cart.products.filter((p) => p.id === product.id);

				if (productFilter.length > 0) {
					const newProducts = cart.products.map((p) => {
						if (p.id === product.id) {
							return { ...p, quantity: p.quantity + 1 };
						} else {
							return p;
						}
					});
					cart.products = newProducts;
				} else {
					cart.products = [...cart.products, { ...product, quantity: 1 }];
				}
			} else {
				cart.products = [{ ...product, quantity: 1 }];
			}

			cart.save();

			res.send({
				status: true,
				data: cart,
			});
		} catch (error) {
			res.status(500).send({
				message: `Error: ${error.message}`,
			});
		}
	},
	increaseQuantityProduct: async (req, res) => {
		const { productId } = req.body;
		const userId = req.userId;

		if (!productId) {
			return res.status(400).send({
				type: "request",
				message: "need some parameter",
			});
		}

		try {
			const cart = await Cart.findOne({ where: { userId } });

			const { products } = cart;

			const productIncrease = products.map((p) => {
				if (p.id === productId) {
					return { ...p, quantity: p.quantity + 1 };
				} else {
					return p;
				}
			});

			cart.products = productIncrease;

			cart.save();

			res.send({
				status: true,
				message: `Product ${productId} increase`,
				data: cart,
			});
		} catch (error) {
			res.status(500).send({
				message: `Error: ${error.message}`,
			});
		}
	},
	decreaseQuantityProduct: async (req, res) => {
		const { productId } = req.body;
		const userId = req.userId;

		if (!productId) {
			return res.status(400).send({
				type: "request",
				message: "need some parameter",
			});
		}

		try {
			const cart = await Cart.findOne({ where: { userId } });

			const { products } = cart;

			const productDecrease = products.map((p) => {
				if (p.id === productId) {
					return { ...p, quantity: p.quantity === 1 ? 1 : p.quantity - 1 };
				} else {
					return p;
				}
			});

			cart.products = productDecrease;

			cart.save();

			res.send({
				status: true,
				message: `Product ${productId} decrease`,
				data: cart,
			});
		} catch (error) {
			res.status(500).send({
				message: `Error: ${error.message}`,
			});
		}
	},
	deleteProduct: async (req, res) => {
		const { productId } = req.body;
		const userId = req.userId;

		if (!productId) {
			return res.status(400).send({
				type: "request",
				message: "need some parameter",
			});
		}

		try {
			const cart = await Cart.findOne({ where: { userId } });

			const { products } = cart;

			const productDelete = products.map((p) => {
				if (p.id !== productId) {
					return p;
				}
			});

			cart.products = productDelete;

			cart.save();

			res.send({
				status: true,
				message: `Product ${productId} delete`,
				data: cart,
			});
		} catch (error) {
			res.status(500).send({
				message: `Error: ${error.message}`,
			});
		}
	},
};
