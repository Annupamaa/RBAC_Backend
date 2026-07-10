const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getLogs,
    getLoginLogs
} = require("../controllers/logController");

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get All Logs
 *     description: Returns all system logs. Accessible only by SUPER_ADMIN and ADMIN.
 *     tags:
 *       - Logs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logs fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Access denied.
 */

router.get(
    "/",
    authMiddleware,
    authorizeRoles("SUPER_ADMIN", "ADMIN"),
    getLogs
);

/**
 * @swagger
 * /api/logs/login:
 *   get:
 *     summary: Get Login Logs
 *     description: Returns login-related logs such as LOGIN_SUCCESS and LOGIN_FAILED. Accessible only by SUPER_ADMIN and ADMIN.
 *     tags:
 *       - Logs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Login logs fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Access denied.
 */

router.get(
    "/login",
    authMiddleware,
    authorizeRoles("SUPER_ADMIN", "ADMIN"),
    getLoginLogs
);

module.exports = router;