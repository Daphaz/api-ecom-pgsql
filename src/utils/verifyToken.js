const { decodeToken } = require("../auth/utils");
const db = require("../models");
const User = db.rest.models.user;

async function verifyToken(req, res, next) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).send({
			status: false,
			type: "request",
			message: "Token is missing",
		});
	}

	try {
		const splitToken = token.split("Bearer ");

		const verifyToken = await decodeToken(splitToken[1]);

		if (verifyToken === "jwt expired" || verifyToken === "invalid token") {
			return res.status(401).send({
				status: false,
				type: "jwt",
				message: "jwt as expired or inValid",
			});
		}

		const user = await User.findOne({
			raw: true,
			where: {
				id: verifyToken,
			},
		});

		if (!user) {
			return res.status(401).send({
				status: false,
				type: "request",
				message: "User not found",
			});
		}

		req.userRoles = user.roles;

		return next();
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
}

export default verifyToken;
