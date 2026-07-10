const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getLogs,
    getLoginLogs
} = require("../controllers/logController");

router.get(
    "/",
    authMiddleware,
    authorizeRoles("SUPER_ADMIN", "ADMIN"),
    getLogs
);

router.get(
    "/login",
    authMiddleware,
    authorizeRoles("SUPER_ADMIN", "ADMIN"),
    getLoginLogs
);

module.exports = router;