const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.listen(8080, console.log("Server listening"));