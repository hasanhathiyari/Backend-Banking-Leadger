const {Router} = require("express");
const authMiddleware = require("../Middleware/auth.middleware");

const transctionRoutes = Router();

transctionRoutes.post("/");

module.exports = transctionRoutes;

