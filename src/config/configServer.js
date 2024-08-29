const dotenv = require('dotenv')

dotenv.config();

env = {
    PORT: process.env.PORT,
    MYSQL_DB: process.env.MYSQL_DB,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_HOST: process.env.MYSQL_HOST
}

module.exports = env;