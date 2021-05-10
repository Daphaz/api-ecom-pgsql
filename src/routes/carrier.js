import { Router } from "express";
import { isAdmin, verifyToken } from "../utils";
const carrier = require("../controllers/CarrierController");
const router = Router();

router.get("/all", verifyToken, carrier.getAllCarrier);
router.get("/edit/:id", verifyToken, carrier.getCarrier);
router.post("/create", verifyToken, isAdmin, carrier.createCarrier);
router.put("/update/:id", verifyToken, isAdmin, carrier.updateCarrier);
router.delete("/delete", verifyToken, isAdmin, carrier.deleteCarrier);

export default router;
