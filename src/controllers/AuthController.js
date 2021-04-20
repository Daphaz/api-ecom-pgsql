const db = require("../models");
const { createToken, decodeToken } = require("../auth/utils");
const bcrypt = require("bcryptjs");
const cookie = require("cookie");
const emailIsValid = require("email-validator");
const User = db.rest.models.user;

const PASSWORD_LENGTH = 5;

exports.login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({
		where: {
			email,
		},
	});

	if (!user) {
		return res.status(401).send({
			status: "false",
			message: "Email doesn't exists",
		});
	}

	let isMatchPassword = await bcrypt.compare(password, user.password);

	if (!isMatchPassword) {
		return res.status(401).send({
			status: false,
			message: "Password doesn't match",
		});
	}

	const token = await createToken(user.dataValues);
	const dateExpire = Date.now() + 10 * 60 * 1000;

	res.setHeader(
		"Set-Cookie",
		cookie.serialize("token", token, {
			httpOnly: true,
			expires: new Date(dateExpire),
		})
	);

	return res.status(200).send({
		status: true,
		message: "You are login",
	});
};

exports.register = async (req, res) => {
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
				let passwordHash = await bcrypt.hash(password, 12);

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
};

exports.isAuth = async (req, res) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401);
	}

	const tokenIsValid = await decodeToken(token);

	if (tokenIsValid === "jwt expired") {
		return res.status(401).send();
	}

	const user = await User.findOne({
		where: {
			id: tokenIsValid,
		},
	});

	if (!user) {
		return res.status(401).send();
	}

	const { email, firstname, lastname } = user.dataValues;

	return res.send({
		email,
		firstname,
		lastname,
	});
};
