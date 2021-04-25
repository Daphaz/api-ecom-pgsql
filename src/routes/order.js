import { Router } from "express";
const order = require("../controllers/OrderController");
const router = Router();

router.get("/:id", order.getOrder);
router.post("/create", order.createOrder);

export default router;
