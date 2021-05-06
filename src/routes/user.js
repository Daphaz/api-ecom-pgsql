import { Router } from "express";
const user = require("../controllers/UserController");
const router = Router();

router.get("/all", user.getAllUser);
router.get("/:id", user.getUser);
router.post("/create", user.createUser);
router.put("/update/:id", user.updateUser);
router.delete("/delete", user.deleteUser);

export default router;
