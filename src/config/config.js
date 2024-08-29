const env = require('./configServer.js')


module.exports = {
    "development": {
      "username": env.MYSQL_USER,
      "password": env.MYSQL_PASSWORD,
      "database": env.MYSQL_DB,
      "host": env.MYSQL_HOST,
      "dialect": "mysql"
    }
}