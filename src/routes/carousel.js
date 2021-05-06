import { Router } from "express";
import { verifyToken, isAdmin, uploadImage } from "../utils";
const carousel = require("../controllers/CarouselController");
const router = Router();

router.get("/", carousel.getCarouselById);
router.get("/all", carousel.getCarousels);
router.post(
	"/create",
	verifyToken,
	isAdmin,
	uploadImage.single("illustration"),
	carousel.createCarousel
);
router.put(
	"/update/:id",
	verifyToken,
	isAdmin,
	uploadImage.single("illustration"),
	carousel.updateCarousel
);
router.delete("/delete", verifyToken, isAdmin, carousel.deleteCarousel);

export default router;
