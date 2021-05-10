const db = require("../models");
const Carrier = db.rest.models.carrier;

exports.getCarrier = async (req, res) => {
	const { id } = req.params;

	try {
		const carrier = await Carrier.findOne({
			raw: true,
			where: {
				id,
			},
		});

		res.send({
			status: true,
			message: "carrier found",
			data: carrier,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.getAllCarrier = async (req, res) => {
	try {
		const carriers = await Carrier.findAll({ raw: true });

		res.send({
			status: true,
			message: "find all carriers",
			data: carriers,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.createCarrier = async (req, res) => {
	const { name, description, price } = req.body;

	try {
		await Carrier.create({
			name,
			description,
			price,
		});

		res.status(201).send({
			status: true,
			message: "Carrier was successful created",
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.updateCarrier = async (req, res) => {
	const { name, description, price } = req.body;

	const { id } = req.params;

	try {
		const oldCarrier = await Carrier.findOne({
			where: {
				id,
			},
		});

		if (!oldCarrier) {
			return res.status(400).send({
				status: false,
				type: "price",
				message: "Carrier not found",
			});
		}

		if (name) {
			oldCarrier.name = name;
		}
		if (description) {
			oldCarrier.description = description;
		}
		if (price) {
			oldCarrier.price = price;
		}

		oldCarrier.save();

		res.send({
			status: true,
			message: "Carrier was successful updated",
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.deleteCarrier = async (req, res) => {
	const { id } = req.body;

	try {
		const carrier = await Carrier.findByPk(id);

		if (!carrier) {
			return res.status(400).send({
				status: false,
				type: "request",
				message: "Carrier not found",
			});
		}

		carrier.destroy();

		res.send({
			status: true,
			message: "Carrier was deleted",
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};
