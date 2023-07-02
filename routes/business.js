const express = require("express");
const router = express.Router();

const businessController = require("../controllers/businessController");
const authenticationToken = require("../middleware/authentication");

router.post("/", authenticationToken, businessController.postBusinessData);

module.exports = router;
