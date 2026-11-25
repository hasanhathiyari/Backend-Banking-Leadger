const express = require("express");
const {registerUserController , loginUserController , logoutUserController} = require("../controller/auth.controller");


const router = express.Router();

/**
 * POST /api/users/register
 */

router.post("/register",registerUserController);

/**
 * POST /api/users/login
 */

router.post("/login", loginUserController);

/**
 * POST /api/users/logout
 */
router.post("/logout",logoutUserController);

module.exports = router;
