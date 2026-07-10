const {
    getLogsService,
    getLoginLogsService,
} = require("../services/logService");

exports.getLogs = async (req, res) => {
    try {
        const logs = await getLogsService();

        return res.status(200).json({
            success: true,
            data: logs,
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getLoginLogs = async (req, res) => {
    try {
        const logs = await getLoginLogsService();

        return res.status(200).json({
            success: true,
            data: logs,
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};