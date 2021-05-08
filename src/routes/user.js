import { Router } from "express";
import { isAdmin, verifyToken } from "../utils";
const user = require("../controllers/UserController");
const router = Router();

router.get("/", verifyToken, user.getUser);
router.get("/all", verifyToken, isAdmin, user.getAllUser);
router.post("/create", verifyToken, isAdmin, user.createUser);
router.put("/modify-password", verifyToken, user.modifyPassword);
router.put("/update/:id", verifyToken, isAdmin, user.updateUser);
router.delete("/delete", verifyToken, isAdmin, user.deleteUser);

export default router;
