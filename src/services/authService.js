const User = require("../models/User");
const OTP = require("../models/OTP");
const generateOTP = require("../utils/generateOTP");
const createLog = require("../utils/logger");
const LOG_ACTIONS = require("../constants/logActions");
const generateToken = require("../utils/generateToken");

const sendOTPService = async (mobile, req) => {
    const user = await User.findOne({ mobile });

    if(!user){
        throw new Error("User not found");
    }

    if(!user.isActive){
        throw new Error("User account is inactive");
    }

    // Delete previous OTPs
    await OTP.deleteMany({ mobile });

    // Generate new OTP
    const otp = generateOTP();

    const expiresAt = new Date(Date.now() + 60 * 1000);

    await OTP.create({
        mobile,
        otp,
        expiresAt,
    });

    await createLog({
    userId: user._id,
    mobile,
    action: LOG_ACTIONS.OTP_GENERATED,
    status: "SUCCESS",
    message: "OTP generated successfully",
    req,
    });

    return {
        user,
        otp,
    };
};

const verifyOTPService = async (mobile, otp, req) => {
    const otpRecord = await OTP.findOne({ mobile }).sort({ createdAt: -1 });

    if(!otpRecord){
        await createLog({
            mobile,
            action: LOG_ACTIONS.LOGIN_FAILED,
            status: "FAILED",
            message: "OTP not found",
            req,
        });

        throw new Error("OTP not found");
    }

    if(new Date() > otpRecord.expiresAt){
        await createLog({
            mobile,
            action: LOG_ACTIONS.OTP_EXPIRED,
            status: "FAILED",
            message: "OTP expired",
            req,
        });

        throw new Error("OTP has expired");
    }

    if(otpRecord.isUsed){
        throw new Error("OTP has already been used");
    }

    if(otpRecord.attemptCount >= 3){
        await createLog({
            mobile,
            action: LOG_ACTIONS.LOGIN_FAILED,
            status: "FAILED",
            message: "Maximum OTP attempts exceeded",
            req,
        });

        throw new Error("Maximum OTP attempts exceeded");
    }

    if(otpRecord.otp !== otp){
        otpRecord.attemptCount += 1;

        await otpRecord.save();

        await createLog({
            mobile,
            action: LOG_ACTIONS.OTP_INVALID,
            status: "FAILED",
            message: "Invalid OTP entered",
            req,
        });

        await createLog({
            mobile,
            action: LOG_ACTIONS.LOGIN_FAILED,
            status: "FAILED",
            message: "Login failed due to invalid OTP",
            req,
        });

        throw new Error("Invalid OTP");
    }

    otpRecord.isUsed = true;

    await otpRecord.save();

    const user = await User.findOne({ mobile });

    if(!user){
        throw new Error("User not found");
    }

    await createLog({
        userId: user._id,
        mobile,
        action: LOG_ACTIONS.OTP_VERIFIED,
        status: "SUCCESS",
        message: "OTP verified successfully",
        req,
    });

    const token = generateToken(user);

    await createLog({
        userId: user._id,
        mobile,
        action: LOG_ACTIONS.LOGIN_SUCCESS,
        status: "SUCCESS",
        message: "User logged in successfully",
        req,
    });

    return{
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            mobile: user.mobile,
            role: user.role,
        },
    };
};

module.exports = {
    sendOTPService,
    verifyOTPService
};