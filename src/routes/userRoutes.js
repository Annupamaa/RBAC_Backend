const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getProfile,
    getUsers,
    createUser,
    updateUserRole,
    deleteUser,
} = require("../controllers/userController");

// Any logged-in user
router.get(
    "/profile",
    authMiddleware,
    getProfile
);

// SUPER_ADMIN, ADMIN, MANAGER
router.get(
    "/",
    authMiddleware,
    authorizeRoles("SUPER_ADMIN", "ADMIN", "MANAGER"),
    getUsers
);

// SUPER_ADMIN, ADMIN
router.post(
    "/",
    authMiddleware,
    authorizeRoles("SUPER_ADMIN", "ADMIN"),
    createUser
);

// SUPER_ADMIN
router.patch(
    "/:id/role",
    authMiddleware,
    authorizeRoles("SUPER_ADMIN"),
    updateUserRole
);

// SUPER_ADMIN
router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("SUPER_ADMIN"),
    deleteUser
);

module.exports = router;