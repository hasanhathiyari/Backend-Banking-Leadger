const express = require("express");
const router = express.Router();
const CookieParser = require("cookie-parser");



const app = express();

/**
 * - Routes
 */
const authRoutes = require("./Routes/auth.routes");
const accountRoutes = require("./Routes/account.routes");
const transactionRoutes = require("./Routes/transction.routes");


app.use(express.json());
app.use(CookieParser());

/**
 * -use Routes
 */
app.use("/api/users",authRoutes);
app.use("/api/account",accountRoutes);
app.use("/api/transaction",transactionRoutes);  



module.exports = app;
