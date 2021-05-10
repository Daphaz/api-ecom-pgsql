import { Router } from "express";
import { verifyToken } from "../utils";
const address = require("../controllers/AddressController");
const router = Router();

router.get("/all", verifyToken, address.getAllAddress);
router.get("/edit", verifyToken, address.getAddress);
router.post("/create", verifyToken, address.createAddress);
router.put("/update/:id", verifyToken, address.updateAddress);
router.delete("/delete", verifyToken, address.deleteAddress);

export default router;
