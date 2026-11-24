const express = require("express");
const authMiddleware = require("../Middleware/auth.middleware");
const { createAccountController } = require("../controller/account.controller");


const Router = express.Router();

/**
 * @POST /api/account/create
 * @description Create a new account for the authenticated user
 */

Router.post("/create", authMiddleware.authMiddleware , createAccountController);

module.exports = Router;