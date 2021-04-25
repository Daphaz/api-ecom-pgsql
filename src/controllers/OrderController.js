const db = require("../models");
const Order = db.rest.models.order;

exports.getOrder = async (req, res) => {
	const { id } = req.params;

	try {
		const order = await Order.findByPk(id);

		if (!order) {
			return res.status(400).send({
				status: false,
				type: "request",
				message: `not found order ${id}`,
			});
		}

		res.send({
			status: true,
			message: "get order",
			data: order,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.createOrder = async (req, res) => {
	const { userId, carrierName, carrierPrice, delivery, products } = req.body;

	if (!userId || !carrierName || !carrierPrice || !delivery || !products) {
		return res.status(400).send({
			status: false,
			type: "request",
			message: "Missing parameters",
		});
	}

	try {
		if (products.length < 0) {
			return res.status(400).send({
				status: false,
				type: "request",
				message: "We need some products",
			});
		}

		const order = Order.create({
			userId,
			carrierName,
			carrierPrice,
			delivery,
		});

		console.log(order);
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};
