const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
        title: "RBAC Backend API",
        version: "1.0.0",
        description:
            "Backend API for OTP Authentication, JWT Authentication, Role-Based Access Control (RBAC), and Logging.",
        },
        servers: [
        {
            url: "http://localhost:8000",
            description: "Local Development Server",
        },
        ],
        components: {
        securitySchemes: {
            bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            },
        },
        },
    },

    apis: [
        "./src/routes/*.js",
    ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;