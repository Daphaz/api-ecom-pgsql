import { Router } from "express";
const resetPassword = require("../controllers/ResetPasswordController");
const router = Router();

router.post("/", resetPassword.getToken);
router.get("/:id/:token", resetPassword.verifyToken);

export default router;
