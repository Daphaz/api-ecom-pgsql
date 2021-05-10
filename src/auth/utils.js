require("dotenv/config");
const jwt = require("jsonwebtoken");

export async function createToken(id) {
	try {
		return jwt.sign({ id }, process.env.JWT_PAYLOAD, {
			expiresIn: 86400,
		});
	} catch (error) {
		console.log("CreateToken: ", error);
	}
}

export async function decodeToken(token) {
	try {
		const decode = jwt.verify(token, process.env.JWT_PAYLOAD);
		return decode.id;
	} catch (error) {
		return error.message;
	}
}
