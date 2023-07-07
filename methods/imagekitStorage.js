const multer = require("multer");

// SDK initialization

const ImageKit = require("imagekit");
const storage = multer.memoryStorage();

const imageKit = new ImageKit({
	publicKey: "public_6LYgy9CAvCHXsKiJ4rjkkSMzYbQ=",
	privateKey: "private_fvY+K/LG12f8DTHf4CP/ygQO8Dg=",
	urlEndpoint: "https://ik.imagekit.io/tekprenuer",
});

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

		if (allowedMimeTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(
				new Error(
					"Invalid file type. Only JPEG, PNG, and GIF files are allowed."
				)
			);
		}
	},
});

module.exports = {
	upload,
	imageKit,
};
