const db = require("../models");
const randtoken = require("rand-token");
const emailIsValid = require("email-validator");
const ResetPassword = db.rest.models.resetPassword;
const User = db.rest.models.user;

exports.getToken = async (req, res) => {
	const { email } = req.body;
	const token = randtoken.generate(16);

	if (!email) {
		res.status(400).send({
			status: false,
			type: "request",
			message: "Need some parameters",
		});
	}

	if (!emailIsValid.validate(email)) {
		res.status(400).send({
			status: false,
			type: "email",
			message: `This email ${email} is not valid`,
		});
	}

	try {
		const user = await User.findOne({
			raw: true,
			where: {
				email,
			},
		});

		if (!user) {
			return res.status(400).send({
				status: false,
				type: "email",
				message: "User was not found",
			});
		}

		const { id: userId } = user;

		const tokenExist = await ResetPassword.findOne({
			where: {
				userId,
			},
		});

		if (!tokenExist) {
			await ResetPassword.create({
				userId,
				token,
			});

			return res.send({
				status: true,
				message: "Token Reset Password was created",
			});
		}

		tokenExist.token = token;

		tokenExist.save();

		res.send({
			status: true,
			message: "Token Reset Password was updated",
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.verifyToken = async (req, res) => {
	const { id, token } = req.params;
	const now = Date.now();

	try {
		const resetPassword = await ResetPassword.findByPk(id, { raw: true });

		const { updatedAt, token: oldToken, status, userId } = resetPassword;

		const parseUpdatedAt = Date.parse(updatedAt);
		const validTime = parseUpdatedAt + 60 * 60 * 1000;

		if (oldToken !== token) {
			return res.status(401).send({
				status: false,
				type: "token",
				message: `Token ${token} is not valid`,
			});
		}

		if (status !== 0) {
			return res.status(400).send({
				status: false,
				type: "token",
				message: `Token ${token} was used`,
			});
		}

		if (now > validTime) {
			return res.status(401).send({
				status: false,
				type: "date",
				message: `Token is expired since ${updatedAt}`,
			});
		}

		res.send({
			status: true,
			message: "Token Valid",
			data: {
				token,
				userId,
			},
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};
