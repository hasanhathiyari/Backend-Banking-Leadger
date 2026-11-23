const express = require("express");
const router = express.Router();
const CookieParser = require("cookie-parser");



const app = express();

const authRoutes = require("./Routes/auth.routes");
app.use(express.json());
app.use(CookieParser());

app.use("/api/users",authRoutes);



module.exports = app;
