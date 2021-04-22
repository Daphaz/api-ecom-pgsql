import { Router } from "express";
const product = require("../controllers/ProductController");
const router = Router();

router.get("/all", product.getProducts);
router.post("/create", product.createProduct);
router.put("/set-category/:id", product.setCategoryProduct);
router.put("/update/:id", product.updateProduct);
router.delete("/delete", product.deleteProduct);

export default router;
