const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Get Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authorization header is missing",
        });
        }

        // Check Bearer token
        if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Invalid authorization format",
        });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded payload
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        });
    }
};

module.exports = authMiddleware;