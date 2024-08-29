const env = require("./configServer.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER, // Use environment variables for production
    password: process.env.DB_PASSWORD, // PostgreSQL password for production
    database: process.env.DB_NAME, // PostgreSQL database for production
    host: process.env.DB_HOST, // PostgreSQL host for production
    port: process.env.DB_PORT, // PostgreSQL port for production
    dialect: "mysql", // Set the dialect to 'postgres'
  },
  production: {
    username: process.env.DB_USER, // Use environment variables for production
    password: process.env.DB_PASSWORD, // PostgreSQL password for production
    database: process.env.DB_NAME, // PostgreSQL database for production
    host: process.env.DB_HOST, // PostgreSQL host for production
    port: process.env.DB_PORT, // PostgreSQL port for production
    dialect: "mysql", // Set the dialect to 'postgres'
  },
};
