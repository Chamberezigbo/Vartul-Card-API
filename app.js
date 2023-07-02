require("dotenv").config();
require("./db");
const express = require("express");

const app = express();
const port = process.env.PORT;

const userRouter = require("./routes/users");
const businessRouter = require("./routes/business");

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/business", businessRouter);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
