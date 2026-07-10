const { sendOTPService, verifyOTPService } = require("../services/authService");

exports.sendOTP = async (req, res) => {
    try {
        const { mobile } = req.body;

        // Check if mobile is provided
        if (!mobile) {
            return res.status(400).json({
            success: false,
            message: "Mobile is required",
            });
        }

        // Validate mobile number
        const mobileRegex = /^[0-9]{10}$/;

        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({
            success: false,
            message: "Mobile number must be exactly 10 digits",
            });
        }

        // Call service
        const result = await sendOTPService(mobile, req);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { mobile, otp } = req.body;

        // Check required fields
        if (!mobile || !otp) {
            return res.status(400).json({
                success: false,
                message: "Mobile and OTP are required",
            });
        }

        // Validate mobile
        const mobileRegex = /^[0-9]{10}$/;

        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({
                success: false,
                message: "Mobile number must be exactly 10 digits",
            });
        }

        // Validate OTP
        const otpRegex = /^[0-9]{6}$/;

        if (!otpRegex.test(otp)) {
            return res.status(400).json({
                success: false,
                message: "OTP must be exactly 6 digits",
            });
        }

        // Call service
        const result = await verifyOTPService(mobile, otp, req);

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