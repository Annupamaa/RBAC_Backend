const Log = require("../models/Log");

const createLog = async ({
    userId = null,
    mobile = null,
    action,
    status,
    message,
    req,
}) => {
    try {
        await Log.create({
        userId,
        mobile,
        action,
        status,
        message,
        ipAddress: req.ip,
        userAgent: req.get("User-Agent"),
        });
    } catch (error) {
        console.error("Log Error:", error.message);
    }
};

module.exports = createLog;