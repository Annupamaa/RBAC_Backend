const Log = require("../models/Log");

const getLogsService = async () => {

    return await Log.find()
        .sort({ createdAt: -1 });

};

const getLoginLogsService = async () => {

    return await Log.find({
        action: {
            $in: [
                "LOGIN_SUCCESS",
                "LOGIN_FAILED"
            ]
        }
    }).sort({
        createdAt: -1
    });

};

module.exports = {
    getLogsService,
    getLoginLogsService,
};