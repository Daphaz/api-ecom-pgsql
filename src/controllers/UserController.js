const db = require("../models");
const emailIsValid = require("email-validator");
const bcrypt = require("bcryptjs");
const User = db.rest.models.user;

const PASSWORD_LENGTH = 5;

exports.getUser = async (req, res) => {
	const { id } = req.params;

	const user = await User.findOne({
		where: {
			id,
		},
	});

	if (!user) {
		return res.status(400).send({
			message: `User not found with the id ${id}`,
		});
	}

	return res.status(200).send(user);
};

exports.createUser = async (req, res) => {
	const { email, password, firstname, lastname } = req.body;

	if (!email && !password && !firstname && !lastname) {
		res.status(400).send({
			message: "You need to include fields",
		});
	}

	let emailExists = await User.findOne({
		where: {
			email,
		},
	});

	if (emailExists) {
		res.status(401).send({
			message: "This email as already used",
		});
	}

	try {
		if (emailIsValid.validate(email)) {
			if (password.length > PASSWORD_LENGTH) {
				let passwordHash = bcrypt.hash(password, 12);

				let newUser = await User.create({
					email,
					password: passwordHash,
					firstname,
					lastname,
				});

				return res.status(201).send(newUser);
			}
			res.status(400).send({
				message: `This password ${password} is not valid`,
			});
		}

		return res.status(400).send({
			message: `This email ${email} is not valid`,
		});
	} catch (err) {
		res.status(500).send({
			message: `Error: ${err.message}`,
		});
	}

	return res.status(200).send(user);
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
			message: "User doesn't exists",
		});
	}

	try {
		if (email) {
			if (emailIsValid.validate(email)) {
				user.email = email;
			} else {
				return res.status(400).send({
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

		return res.status(204).send({
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
			message: "User not found",
		});
	}

	const user = await User.findOne({
		where: {
			id,
		},
	});

	if (!user) {
		res.status(400).send({
			message: "User doesn't exists",
		});
	}

	try {
		await user.destroy();

		return res.status(200).send({
			message: `User ${id} has been deleted !`,
		});
	} catch (err) {
		res.status(500).send({
			message: `Error: ${err.message}`,
		});
	}

	return res.status(200).send(user);
};
