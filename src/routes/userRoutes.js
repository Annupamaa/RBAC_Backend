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

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get Logged-in User Profile
 *     description: Returns the profile of the currently authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully.
 *       401:
 *         description: Unauthorized.
 */

// Any logged-in user
router.get(
    "/profile",
    authMiddleware,
    getProfile
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get All Users
 *     description: Returns all users. Accessible by SUPER_ADMIN, ADMIN and MANAGER.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully.
 *       403:
 *         description: Access denied.
 */

// SUPER_ADMIN, ADMIN, MANAGER
router.get(
    "/",
    authMiddleware,
    authorizeRoles("SUPER_ADMIN", "ADMIN", "MANAGER"),
    getUsers
);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create New User
 *     description: Creates a new user. Accessible by SUPER_ADMIN and ADMIN.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - mobile
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Sharma
 *               mobile:
 *                 type: string
 *                 example: "9999999995"
 *               role:
 *                 type: string
 *                 enum:
 *                   - SUPER_ADMIN
 *                   - ADMIN
 *                   - MANAGER
 *                   - USER
 *                 example: USER
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Validation error.
 *       403:
 *         description: Access denied.
 */

// SUPER_ADMIN, ADMIN
router.post(
    "/",
    authMiddleware,
    authorizeRoles("SUPER_ADMIN", "ADMIN"),
    createUser
);

/**
 * @swagger
 * /api/users/{id}/role:
 *   patch:
 *     summary: Update User Role
 *     description: Updates the role of a user. Accessible only by SUPER_ADMIN.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum:
 *                   - SUPER_ADMIN
 *                   - ADMIN
 *                   - MANAGER
 *                   - USER
 *                 example: ADMIN
 *     responses:
 *       200:
 *         description: Role updated successfully.
 *       403:
 *         description: Access denied.
 */

// SUPER_ADMIN
router.patch(
    "/:id/role",
    authMiddleware,
    authorizeRoles("SUPER_ADMIN"),
    updateUserRole
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete User
 *     description: Deletes a user. Accessible only by SUPER_ADMIN.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       403:
 *         description: Access denied.
 *       404:
 *         description: User not found.
 */

// SUPER_ADMIN
router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("SUPER_ADMIN"),
    deleteUser
);

module.exports = router;