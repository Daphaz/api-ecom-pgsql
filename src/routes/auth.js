import { Router } from "express";
const auth = require("../controllers/AuthController");
const router = Router();

router.get("/", auth.isAuth);
router.post("/login", auth.login);
router.post("/register", auth.register);
router.put("/modify-password/:idToken", auth.modifyPassword);

export default router;
