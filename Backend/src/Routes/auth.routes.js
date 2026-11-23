const express = require("express");
const {registerUserController , loginUserController} = require("../controller/auth.controller");


const router = express.Router();

/**
 * POST /api/users/register
 */

router.post("/register",registerUserController);

/**
 * POST /api/users/login
 */

router.post("/login", loginUserController);

module.exports = router;
