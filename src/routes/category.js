import { Router } from "express";
const category = require("../controllers/CategoryController");
const router = Router();

router.get("/all", category.getCategories);
router.post("/create", category.createCategory);
router.put("/update/:id", category.updateCategory);
router.delete("/delete", category.deleteCategory);

export default router;
