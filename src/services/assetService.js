const Asset = require("../models/assetModel");

const createAsset = async (assetData) => {
    const existingAsset = await Asset.findOne({
        name: assetData.name,
        isDeleted:false
    });

    if(existingAsset){
        throw new Error("Asset already exists");
    }

    const asset = await Asset.create(assetData);
    return asset;
};

module.exports = {
    createAsset
};