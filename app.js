require("dotenv").config();
require("./db");
const cors = require("cors");
const express = require("express");
const session = require("express-session");

const app = express();
const port = process.env.PORT;

const userRouter = require("./routes/users");
const businessRouter = require("./routes/business");
const passwordRouter = require("./routes/password");
const socialRouter = require("./routes/socialLinks");

app.use(express.json());
app.use(cors());
app.use(
	session({
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: false,
	})
);

app.use("/api/users", userRouter);
app.use("/api/business", businessRouter);
app.use("/api/social-links", socialRouter);
app.use("/api", passwordRouter);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
