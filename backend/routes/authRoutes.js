const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const{

register,
login,
logout,
forgotPassword,
resetPassword,
refreshToken

}=require(
"../controllers/authController"
);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags:
 *       - Authentication
 */
router.post("/register",register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 */

router.post("/login",login);

router.get(
"/logout",
protect,
logout
);

router.post(
"/forgot-password",
forgotPassword
);

router.put(
"/reset-password/:token",
resetPassword
);

router.post(
"/refresh-token",
refreshToken
);

module.exports = router;