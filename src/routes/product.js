import { Router } from "express";
import { verifyToken, isAdmin, uploadImage } from "../utils";
const product = require("../controllers/ProductController");
const router = Router();

router.get("/edit/:id", product.getProductById);
router.get("/all", product.getProducts);
router.post(
	"/create",
	verifyToken,
	isAdmin,
	uploadImage.single("illustration"),
	product.createProduct
);
router.put(
	"/set-category/:id",
	verifyToken,
	isAdmin,
	product.setCategoryProduct
);
router.put("/is-best/:id", verifyToken, isAdmin, product.setIsBest);
router.put(
	"/update/:id",
	verifyToken,
	isAdmin,
	uploadImage.single("illustration"),
	product.updateProduct
);
router.delete("/delete", verifyToken, isAdmin, product.deleteProduct);

export default router;
