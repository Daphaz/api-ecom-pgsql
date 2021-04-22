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
		raw: true,
		where: {
			email,
		},
	});

	if (!user) {
		return res.status(401).send({
			status: false,
			type: "email",
			message: "Email doesn't exists",
		});
	}

	let isMatchPassword = await bcrypt.compare(password, user.password);

	if (!isMatchPassword) {
		return res.status(401).send({
			status: false,
			type: "password",
			message: "Password doesn't match",
		});
	}

	const token = await createToken(user.id);
	const dateExpire = Date.now() + 10 * 60 * 1000;

	res.setHeader(
		"Set-Cookie",
		cookie.serialize("token", token, {
			httpOnly: true,
			expires: new Date(dateExpire),
		})
	);

	return res.send({
		status: true,
		message: "You are login",
	});
};

exports.register = async (req, res) => {
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
					message: "User was successfull created",
				});
			}
			res.status(400).send({
				status: false,
				type: "password",
				message: `Password must be minimum 5 character`,
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
};

exports.isAuth = async (req, res) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).send({
			status: false,
			message: "We need token for authentification",
		});
	}

	const tokenIsValid = await decodeToken(token);

	console.log(tokenIsValid);

	if (tokenIsValid === "jwt expired" || tokenIsValid === "invalid token") {
		return res.status(401).send({
			status: false,
			message: "jwt was expired or not Valid",
		});
	}

	const user = await User.findOne({
		raw: true,
		where: {
			id: tokenIsValid,
		},
	});

	if (!user) {
		return res.status(401).send({
			status: false,
			message: "User not found",
		});
	}

	const { email, firstname, lastname } = user;

	return res.send({
		status: true,
		data: {
			email,
			firstname,
			lastname,
		},
	});
};
