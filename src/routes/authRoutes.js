const express = require("express");
const router = express.Router();

const {
    sendOTP,
    verifyOTP,
} = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Generate OTP
 *     description: Generates a 6-digit OTP for a registered and active user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9999999991"
 *     responses:
 *       200:
 *         description: OTP generated successfully.
 *       400:
 *         description: Invalid mobile number.
 *       404:
 *         description: User not found.
 */

router.post("/send-otp", sendOTP);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP and Login
 *     description: Verifies the OTP and returns a JWT token on successful authentication.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - otp
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9999999991"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful.
 *       400:
 *         description: Invalid OTP.
 *       401:
 *         description: OTP expired or already used.
 */
router.post("/verify-otp", verifyOTP);

module.exports = router;