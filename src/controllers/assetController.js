const assetService = require("../services/assetService");
const asyncHandler = require("../utils/asyncHandler");

const createAsset = asyncHandler(async (req, res) => {
    const asset = await assetService.createAsset({
        ...req.body,
        createdBy: req.user.userId
    });

    res.status(201).json({
        success: true,
        message: "Asset created successfully",
        data: asset
    });

});