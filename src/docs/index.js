const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = require("./config");

const specs = swaggerJsDoc(options);

const optionsSwagger = {
	swaggerOptions: {
		defaultModelsExpandDepth: -1,
		docExpansion: "none",
	},
};

module.exports = {
	swaggerUI,
	specs,
	optionsSwagger,
};
