const mongoose = require("mongoose");
const {
    ASSET_TYPES,
    ASSET_STATUS,
    ENVIRONMENTS,
} = require("../constants/asset.constants");

const assetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            enum: Object.values(ASSET_TYPES),
            required: true,
        },

        owner: {
            type: String,
            required: true,
            trim: true,
        },

        environment: {
            type: String,
            enum: Object.values(ENVIRONMENTS),
            default: ENVIRONMENTS.PRODUCTION,
        },

        status: {
            type: String,
            enum: Object.values(ASSET_STATUS),
            default: ASSET_STATUS.PROTECTED,
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        lastBackupAt: {
            type: Date,
            default: null,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Asset", assetSchema);