const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/test-user", async (req, res) => {
    try {
        const user = await User.create({
            name: "Anupama",
            mobile: "9876543210",
            role: "SUPER_ADMIN",
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;