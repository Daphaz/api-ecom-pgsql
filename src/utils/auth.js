const { decodeToken } = require("../auth/utils");

async function verifyToken(req, res, next) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).send({
			status: false,
			type: "request",
			message: "Token is missing",
		});
	}

	const id = await decodeToken(token);

	if (id === "jwt expired") {
		return res.status(401).send({
			status: false,
			type: "jwt",
			message: "jwt as expired",
		});
	}

	const user = await User.findOne({
		where: {
			id,
		},
	});

	if (!user) {
		return res.status(401).send();
	}

	const { email, firstname, lastname } = user.dataValues;

	return res.send({
		status: true,
		data: {
			email,
			firstname,
			lastname,
		},
	});
}

export default verifyToken;
