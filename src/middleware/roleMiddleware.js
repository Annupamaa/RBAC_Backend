const createLog = require("../utils/logger");
const LOG_ACTIONS = require("../constants/logActions");

const authorizeRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                success: false,
                message: "Unauthorized",
                });
            }

            if (!allowedRoles.includes(req.user.role)) {
                // Log access denied
                await createLog({
                userId: req.user.userId,
                mobile: req.user.mobile,
                action: LOG_ACTIONS.ACCESS_DENIED,
                status: "FAILED",
                message: `Role ${req.user.role} tried to access ${req.originalUrl}`,
                req,
                });

                return res.status(403).json({
                success: false,
                message: "Access denied",
                });
            }

            next();

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
};

module.exports = authorizeRoles;