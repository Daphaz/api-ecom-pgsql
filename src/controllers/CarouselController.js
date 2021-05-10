const db = require("../models");
const Carousel = db.rest.models.carousel;

exports.getCarouselById = async (req, res) => {
	const { id } = req.query;

	if (!id) {
		return res.status(400).send({
			status: false,
			message: "need some parameter",
		});
	}

	try {
		const carousel = await Carousel.findOne({
			where: {
				id,
			},
		});

		if (carousel) {
			return res.send({
				status: true,
				message: "found carousel",
				data: carousel,
			});
		}

		return res.send({
			status: false,
			message: "Not found carousel",
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.getCarousels = async (req, res) => {
	try {
		const carousels = await Carousel.findAll({ raw: true });

		if (carousels.length > 0) {
			return res.send({
				status: true,
				message: "get all carousels",
				data: carousels,
			});
		}

		return res.send({
			status: false,
			type: "request",
			message: "Don't find any carousels",
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.createCarousel = async (req, res) => {
	const { title, content, btn_title, btn_url } = req.body;

	if (!req.file) {
		return res.status(400).send({
			status: false,
			type: "illustration",
			message: "check your input images",
		});
	}

	const illustration = req.file.filename;

	try {
		const carousel = await Carousel.create({
			title,
			content,
			btn_title,
			btn_url,
			illustration,
		});

		res.status(201).send({
			status: true,
			message: "carousel sucessfull created",
			data: carousel,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.updateCarousel = async (req, res) => {
	const { title, content, btn_title, btn_url, illustration } = req.body;
	const { id } = req.params;

	if (!id) {
		return res.status(400).send({
			status: false,
			message: "need some parameter",
		});
	}

	try {
		const carousel = await Carousel.findOne({
			where: {
				id,
			},
		});

		if (title) {
			carousel.title = title;
		}
		if (content) {
			carousel.content = content;
		}
		if (!illustration) {
			const image = req.file.filename;
			carousel.illustration = image;
		}
		if (illustration) {
			carousel.illustration = illustration;
		}
		if (btn_title) {
			carousel.btn_title = btn_title;
		}
		if (btn_url) {
			carousel.btn_url = btn_url;
		}

		carousel.save();

		res.status(201).send({
			status: true,
			message: `Carousel ${id} was updated`,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error: ${error.message}`,
		});
	}
};

exports.deleteCarousel = async (req, res) => {
	const { id } = req.body;

	if (!id) {
		res.status(400).send({
			status: false,
			type: "request",
			message: "Carousel not found",
		});
	}

	try {
		const carousel = await Carousel.findOne({
			where: {
				id,
			},
		});

		await carousel.destroy();

		return res.send({
			status: true,
			message: `Carousel ${id} has been deleted !`,
		});
	} catch (err) {
		res.status(500).send({
			message: `Error: ${err.message}`,
		});
	}
};
