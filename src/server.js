import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import fs from "fs";
import path from "path";
import { specs, swaggerUI } from "./docs";
import routes from "./routes";
import { isAdmin, verifyToken } from "./utils";

const app = express();

const accessLogStream = fs.createWriteStream(
	path.join(__dirname, "../access.log"),
	{ flags: "a" }
);

app.use(
	cors({
		credentials: true,
		origin: process.env.FRONTEND_URL,
	})
);
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/user", verifyToken, isAdmin, routes.user);
app.use("/auth", routes.auth);
app.use("/category", routes.category);
app.use("/product", routes.product);
app.use("/reset", routes.resetPassword);

app.use((req, res) => {
	res.status(404).send("404: Page not found");
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port: ${process.env.PORT}`);
});
