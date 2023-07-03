const express = require("express");
const { postForgotPassword } = require("../controllers/passwordController");
const router = express.Router();

router.post("/forgot-password", postForgotPassword);

module.exports = router;
