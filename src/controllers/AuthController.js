const db = require("../models");
const { createToken, decodeToken } = require("../auth/utils");
const bcrypt = require("bcryptjs");
const emailIsValid = require("email-validator");
const User = db.rest.models.user;
const ResetPassword = db.rest.models.resetPassword;

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

	return res.send(token);
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
			type: "jwt",
			message: "You need token for authentification",
		});
	}

	const splitToken = token.split("Bearer ");
	const tokenIsValid = await decodeToken(splitToken[1]);

	if (tokenIsValid === "jwt expired" || tokenIsValid === "invalid token") {
		return res.status(401).send({
			status: false,
			message: "jwt was expired or not Valid",
		});
	}

	try {
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

		req.userId = user.id;

		return res.send({
			status: true,
			data: {
				email,
				firstname,
				lastname,
			},
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.modifyPassword = async (req, res) => {
	const { password, userId } = req.body;
	const { idToken } = req.params;

	if (!password || !userId) {
		return res.status(400).send({
			status: false,
			type: "request",
			message: "Missing parameters",
		});
	}

	if (password.length < PASSWORD_LENGTH) {
		return res.status(400).send({
			status: false,
			type: "password",
			message: `Password ${password} is not valid`,
		});
	}

	try {
		const resetPassword = await ResetPassword.findOne({
			where: {
				id: idToken,
			},
		});

		if (!resetPassword) {
			return res.status(401).send({
				status: false,
				message: "Not found token",
			});
		}

		const timeIsValid =
			Date.now() >
			Date.parse(resetPassword.dataValues.updatedAt) + 60 * 60 * 1000
				? false
				: true;

		if (!timeIsValid) {
			await resetPassword.destroy();

			return res.status(401).send({
				status: false,
				type: "token",
				message: "token has expired",
			});
		}

		if (resetPassword.dataValues.status !== 0) {
			await resetPassword.destroy();

			return res.status(400).send({
				status: false,
				type: "token",
				message: "token already used",
			});
		}

		const user = await User.findByPk(userId);

		resetPassword.status = 1;
		resetPassword.token = 0;

		resetPassword.save();

		const hashPassword = await bcrypt.hash(password, 12);

		user.password = hashPassword;

		user.save();

		res.send({
			status: true,
			message: "User password is updated",
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};
