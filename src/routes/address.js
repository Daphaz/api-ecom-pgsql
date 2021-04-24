import { Router } from "express";
const address = require("../controllers/AddressController");
const router = Router();

router.get("/:userId/:id", address.getAddress);
router.get("/all/:userId", address.getAllAddress);
router.post("/create", address.createAddress);
router.put("/update/:id", address.updateAddress);
router.delete("/delete", address.deleteAddress);

export default router;
