const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = require("./config");

const specs = swaggerJsDoc(options);

module.exports = {
	swaggerUI,
	specs,
};
