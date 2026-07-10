const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
    {
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
        },

        mobile: {
        type: String,
        },

        action: {
        type: String,
        required: true,
        },

        status: {
        type: String,
        enum: ["SUCCESS", "FAILED"],
        required: true,
        },

        ipAddress: {
        type: String,
        },

        userAgent: {
        type: String,
        },

        message: {
        type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Log", logSchema);