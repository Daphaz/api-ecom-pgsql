import { Router } from "express";
import { verifyToken } from "../utils";
const cart = require("../controllers/CartController");
const router = Router();

router.get("/", verifyToken, cart.createCart);
router.put("/add", verifyToken, cart.addProduct);
router.put("/increase", verifyToken, cart.increaseQuantityProduct);
router.put("/decrease", verifyToken, cart.decreaseQuantityProduct);
router.delete("/delete-product", verifyToken, cart.deleteProduct);

export default router;
