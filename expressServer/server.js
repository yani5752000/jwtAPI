const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.listen(8080, console.log("Server listening"));