const db = require("../models");
const User = db.rest.models.user;

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
		res.status(400).send({
			message: "This email as already used",
		});
	}

	try {
		let newUser = await User.create({
			email,
			password,
			firstname,
			lastname,
		});

		return res.status(201).send(newUser);
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
			user.email = email;
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

		return res.status(200).send({
			message: `User ${id} was updated !`,
		});
	} catch (err) {
		res.status(500).send({
			message: `Error: ${err.message}`,
		});
	}

	return res.status(200).send(user);
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
