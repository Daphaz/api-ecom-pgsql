const db = require("../models");
const Address = db.rest.models.address;
const User = db.rest.models.user;

exports.getAddress = async (req, res) => {
	const { id, userId } = req.params;

	try {
		const address = await Address.findOne({
			raw: true,
			where: {
				id,
				userId,
			},
		});

		res.send({
			status: true,
			message: "address found",
			data: address,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.getAllAddress = async (req, res) => {
	const { userId } = req.params;

	try {
		const addresses = await Address.findAll({
			where: {
				userId,
			},
		});

		res.send({
			status: true,
			message: "find all addresse",
			data: addresses,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.createAddress = async (req, res) => {
	const {
		userId,
		name,
		firstname,
		lastname,
		company,
		address,
		postal,
		city,
		country,
		phone,
	} = req.body;

	try {
		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(400).send({
				status: false,
				type: "request",
				message: "User not found",
			});
		}

		await Address.create({
			userId,
			name,
			firstname,
			lastname,
			company,
			address,
			postal,
			city,
			country,
			phone,
		});

		res.status(201).send({
			status: true,
			message: "Address was successful created",
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.updateAddress = async (req, res) => {
	const {
		userId,
		name,
		firstname,
		lastname,
		company,
		address,
		postal,
		city,
		country,
		phone,
	} = req.body;

	const { id } = req.params;

	try {
		const oldAdress = await Address.findOne({
			where: {
				id,
				userId,
			},
		});

		if (!oldAdress) {
			return res.status(400).send({
				status: false,
				type: "request",
				message: "Address not found",
			});
		}

		if (name) {
			oldAdress.name = name;
		}
		if (firstname) {
			oldAdress.firstname = firstname;
		}
		if (lastname) {
			oldAdress.lastname = lastname;
		}
		if (company) {
			oldAdress.company = company;
		}
		if (address) {
			oldAdress.address = address;
		}
		if (postal) {
			oldAdress.postal = postal;
		}
		if (city) {
			oldAdress.city = city;
		}
		if (country) {
			oldAdress.country = country;
		}
		if (phone) {
			oldAdress.phone = phone;
		}

		oldAdress.save();

		res.send({
			status: true,
			message: "Address was successful updated",
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.deleteAddress = async (req, res) => {
	const { id } = req.body;

	try {
		const address = await Address.findByPk(id);

		if (!address) {
			return res.status(400).send({
				status: false,
				type: "request",
				message: "Address not found",
			});
		}

		address.destroy();

		res.send({
			status: true,
			message: "Address was deleted",
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};
