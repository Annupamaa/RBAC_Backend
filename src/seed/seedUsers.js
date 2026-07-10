const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("../config/db");
const User = require("../models/User");

const seedUsers = async () => {

    await connectDB();

    await User.deleteMany();

    await User.insertMany([
    {
        name: "Super Admin",
        mobile: "9999999991",
        role: "SUPER_ADMIN",
    },
    {
        name: "Admin",
        mobile: "9999999992",
        role: "ADMIN",
    },
    {
        name: "Manager",
        mobile: "9999999993",
        role: "MANAGER",
    },
    {
        name: "User",
        mobile: "9999999994",
        role: "USER",
    },
    ]);

    console.log("Users Seeded");

    process.exit();
};

seedUsers();