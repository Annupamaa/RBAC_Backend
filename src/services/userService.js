const User = require("../models/User");
const createLog = require("../utils/logger");
const LOG_ACTIONS = require("../constants/logActions");

const getProfileService = async (userData) => {
    const user = await User.findById(userData.userId).select("-__v");

    if(!user){
    throw new Error("User not found");
    }

    return user;
};

const getUsersService = async () => {

    return await User.find().select("-__v");

};

const createUserService = async (data, loggedInUser, req) => {
    const { name, mobile, role } = data;

    // Validation
    if (!name || !mobile || !role) {
        throw new Error("Name, mobile and role are required");
    }

    const allowedRoles = [
        "SUPER_ADMIN",
        "ADMIN",
        "MANAGER",
        "USER"
    ];

    if(!allowedRoles.includes(role)){
        throw new Error("Invalid role");
    }

    // Check duplicate mobile
    const existingUser = await User.findOne({ mobile });

    if(existingUser){
        throw new Error("Mobile number already exists");
    }

    // Create user
    const user = await User.create({
        name,
        mobile,
        role,
        isActive: true,
    });

    // Create log
    await createLog({
        userId: loggedInUser.userId,
        mobile: loggedInUser.mobile,
        action: LOG_ACTIONS.USER_CREATED,
        status: "SUCCESS",
        message: `Created user ${user.name}`,
        req,
    });

    return user;
};

const updateUserRoleService = async (
    userId,
    data,
    loggedInUser,
    req
) => {

    const { role } = data;

    if(!role){
        throw new Error("Role is required");
    }

    const allowedRoles = [
        "SUPER_ADMIN",
        "ADMIN",
        "MANAGER",
        "USER"
    ];

    if(!allowedRoles.includes(role)){
        throw new Error("Invalid role");
    }

    const user = await User.findById(userId);

    if(!user){
        throw new Error("User not found");
    }

    const oldRole = user.role;

    user.role = role;

    await user.save();

    await createLog({
        userId: loggedInUser.userId,
        mobile: loggedInUser.mobile,
        action: LOG_ACTIONS.ROLE_UPDATED,
        status: "SUCCESS",
        message: `Updated ${user.name} role from ${oldRole} to ${role}`,
        req,
    });

    return user;
};

const deleteUserService = async (
    userId,
    loggedInUser,
    req
) => {

    const user = await User.findById(userId);

    if(!user){
        throw new Error("User not found");
    }

    await User.findByIdAndDelete(userId);

    await createLog({
        userId: loggedInUser.userId,
        mobile: loggedInUser.mobile,
        action: LOG_ACTIONS.USER_DELETED,
        status: "SUCCESS",
        message: `Deleted user ${user.name}`,
        req,
    });

    return user;

};

module.exports = {
    getProfileService,
    getUsersService,
    createUserService,
    updateUserRoleService,
    deleteUserService,
};