async function isAdmin(req, res, next) {
	const roles = req.userRoles;

	if (roles !== "admin") {
		res.status(401).send({
			status: false,
			message: "You must be a admin..",
		});
	}

	return next();
}

export default isAdmin;
