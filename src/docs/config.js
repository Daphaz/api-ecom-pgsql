module.exports = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express / Postgresql API for e-commerce website",
		},
		servers: [
			{
				url: "http://localhost:4000",
			},
		],
	},
	apis: ["./src/docs/swagger/*.js"],
};
