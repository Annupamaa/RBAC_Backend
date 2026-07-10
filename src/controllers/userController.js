const {
    getProfileService,
    getUsersService,
    createUserService,
    updateUserRoleService,
    deleteUserService,
} = require("../services/userService");

exports.getProfile = async (req, res) => {
    try {
        const result = await getProfileService(req.user);

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const result = await getUsersService();

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.createUser = async (req, res) => {
    try {
        const result = await createUserService(req.body, req.user, req);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const result = await updateUserRoleService(
            req.params.id,
            req.body,
            req.user,
            req
        );

        return res.status(200).json({
            success: true,
            message: "Role updated successfully",
            data: result,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const result = await deleteUserService(
            req.params.id,
            req.user,
            req
        );

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result,
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};