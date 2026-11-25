const express = require("express");
const authMiddleware = require("../Middleware/auth.middleware");
const { createAccountController , getUserAccountsController, getaccountBalanceController } = require("../controller/account.controller");


const Router = express.Router();

/**
 * @POST /api/account/create
 * @description Create a new account for the authenticated user
 */

Router.post("/create", authMiddleware.authMiddleware , createAccountController);

/**
 * @GET /api/account/
 * @description get all acoounts of the logged in user 
 * @access protected
 */
Router.get("/",authMiddleware.authMiddleware,getUserAccountsController);

/**
 * @GET  /api/account/balance/:accountId
 * @description get the balance of an acoount with the help of account ID 
 * @access public
 */

Router.get("/balance/:accountId",authMiddleware.authMiddleware,getaccountBalanceController);

module.exports = Router;