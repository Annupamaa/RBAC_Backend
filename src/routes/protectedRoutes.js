const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Any logged-in user
router.get(
    "/profile",
    authMiddleware,
    (req, res) => {
        res.json({
            success: true,
            message: "Profile Access",
            user: req.user,
        });
    }
);

// SUPER_ADMIN only
router.get(
    "/admin",
    authMiddleware,
    authorizeRoles("SUPER_ADMIN"),
    (req, res) => {
        res.json({
            success: true,
            message: "SUPER_ADMIN Access",
        });
    }
);

// SUPER_ADMIN + ADMIN
router.get(
    "/manage-users",
    authMiddleware,
    authorizeRoles("SUPER_ADMIN", "ADMIN"),
    (req, res) => {
        res.json({
            success: true,
            message: "Manage Users Access",
        });
    }
);

// SUPER_ADMIN + ADMIN + MANAGER
router.get(
    "/view-users",
    authMiddleware,
    authorizeRoles(
        "SUPER_ADMIN",
        "ADMIN",
        "MANAGER"
    ),
    (req, res) => {
        res.json({
            success: true,
            message: "View Users Access",
        });
    }
);

module.exports = router;