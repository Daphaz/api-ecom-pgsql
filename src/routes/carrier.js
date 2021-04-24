import { Router } from "express";
import { isAdmin } from "../utils";
const carrier = require("../controllers/CarrierController");
const router = Router();

router.get("/:id", carrier.getCarrier);
router.get("/all", carrier.getAllCarrier);
router.post("/create", isAdmin, carrier.createCarrier);
router.put("/update/:id", isAdmin, carrier.updateCarrier);
router.delete("/delete", isAdmin, carrier.deleteCarrier);

export default router;
