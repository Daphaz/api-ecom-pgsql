const db = require("../models");
const emailIsValid = require("email-validator");
const bcrypt = require("bcryptjs");
const User = db.rest.models.user;

const PASSWORD_LENGTH = 5;

exports.getUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findOne({
			raw: true,
			where: {
				id,
			},
		});

		return res.send({
			status: true,
			data: {
				id: user.id,
				email: user.email,
				firstname: user.firstname,
				lastname: user.lastname,
				role: user.roles,
			},
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.createUser = async (req, res) => {
	const { email, password, firstname, lastname } = req.body;

	if (!email && !password && !firstname && !lastname) {
		res.status(400).send({
			status: false,
			type: "request",
			message: "You need to include fields",
		});
	}

	let emailExists = await User.findOne({
		raw: true,
		where: {
			email,
		},
	});

	if (emailExists) {
		res.status(401).send({
			status: false,
			type: "email",
			message: "This email as already used",
		});
	}

	try {
		if (emailIsValid.validate(email)) {
			if (password.length > PASSWORD_LENGTH) {
				let passwordHash = await bcrypt.hash(password, 12);

				await User.create({
					email,
					password: passwordHash,
					firstname,
					lastname,
				});

				return res.status(201).send({
					status: true,
					message: "New User was created !",
				});
			}
			res.status(400).send({
				status: false,
				type: "password",
				message: `This password ${password} is not valid`,
			});
		}

		return res.status(400).send({
			status: false,
			type: "email",
			message: `This email ${email} is not valid`,
		});
	} catch (err) {
		res.status(500).send({
			message: `Error: ${err.message}`,
		});
	}

	return res.status(201).send({
		status: true,
		message: "User sucessfull created",
	});
};

exports.updateUser = async (req, res) => {
	const { email, password, firstname, lastname } = req.body;
	const { id } = req.params;

	const user = await User.findOne({
		where: {
			id,
		},
	});

	if (!user) {
		res.status(400).send({
			status: false,
			type: "request",
			message: "User doesn't exists",
		});
	}

	try {
		if (email) {
			if (emailIsValid.validate(email)) {
				user.email = email;
			} else {
				return res.status(400).send({
					status: false,
					type: "email",
					message: "Email is inValid",
				});
			}
		}
		if (password) {
			user.password = password;
		}
		if (firstname) {
			user.firstname = firstname;
		}
		if (lastname) {
			user.lastname = lastname;
		}

		user.save();

		return res.send({
			status: true,
			message: `User ${id} was updated !`,
		});
	} catch (err) {
		res.status(500).send({
			message: `Error: ${err.message}`,
		});
	}
};

exports.deleteUser = async (req, res) => {
	const { id } = req.body;

	if (!id) {
		res.status(400).send({
			status: false,
			type: "request",
			message: "User not found",
		});
	}

	try {
		const user = await User.findOne({
			where: {
				id,
			},
		});

		await user.destroy();

		return res.send({
			status: true,
			message: `User ${id} has been deleted !`,
		});
	} catch (err) {
		res.status(500).send({
			message: `Error: ${err.message}`,
		});
	}
};
