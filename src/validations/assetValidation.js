const Joi = require("joi");

const {
    ASSET_TYPES,
    ENVIRONMENTS
} = require("../constants/asset.constants");

const createAssetSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),

    type: Joi.string()
        .valid(...Object.values(ASSET_TYPES))
        .required(),

    owner: Joi.string().required(),

    department: Joi.string()
        .trim()
        .required(),

    environment: Joi.string()
        .valid(...Object.values(ENVIRONMENTS))
        .default(ENVIRONMENTS.PRODUCTION),

    description: Joi.string()
        .allow("")
        .optional()
});

module.exports = {
    createAssetSchema
};