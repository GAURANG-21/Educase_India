const dotenv = require('dotenv');

dotenv.config();

env = {
    PORT: process.env.PORT || 3000 || 3001,
    MYSQL_DB: process.env.MYSQL_DB,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_HOST: process.env.MYSQL_HOST || '127.0.0.1'
}

module.exports = env;