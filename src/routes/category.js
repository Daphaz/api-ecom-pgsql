import { Router } from "express";
import { verifyToken, isAdmin } from "../utils";
const category = require("../controllers/CategoryController");
const router = Router();

router.get("/all", category.getCategories);
router.post("/create", verifyToken, isAdmin, category.createCategory);
router.put("/update/:id", verifyToken, isAdmin, category.updateCategory);
router.delete("/delete", verifyToken, isAdmin, category.deleteCategory);

export default router;
