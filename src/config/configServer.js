const dotenv = require("dotenv");

dotenv.config();

env = {
  PORT: process.env.PORT || 3000 || 3001,
  MYSQL_DB: process.env.DB_NAME,
  MYSQL_USER: process.env.DB_USER,
  MYSQL_PASSWORD: process.env.DB_PASSWORD,
  MYSQL_HOST: process.env.DB_HOST || "127.0.0.1",
};

module.exports = env;
