const Sequelize = require("sequelize");
const env = require("./configServer.js");

let sequelize;

const connectWithRetry = async () => {
  try {
    sequelize = new Sequelize(
      env.MYSQL_DB,
      env.MYSQL_USER,
      env.MYSQL_PASSWORD,
      {
        host: env.MYSQL_HOST,
        dialect: "mysql",
        logging: false, // Disable logging; default: console.log
        pool: {
          max: 5,
          min: 0,
          acquire: 30000, // Maximum time in ms to wait for a connection to be established before throwing an error
          idle: 10000, // Time in ms after which a connection is released if it's not used
        },
        retry: {
          max: 5, // Set the maximum number of retry attempts
        },
        dialectOptions: {
          connectTimeout: 10000, // 10 seconds timeout for initial connection
        },
      }
    );

    await sequelize.authenticate();
    console.log("MySQL connected...");
  } catch (err) {
    console.error(`MySQL connection error: ${err.message}`);
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
  }
};

const disconnectDB = async () => {
  try {
    if (sequelize) {
      await sequelize.close();
      console.log("MySQL disconnected...");
    }
  } catch (err) {
    console.error(`Error while disconnecting MySQL: ${err.message}`);
  }
};

// Sequelize event handling (optional)
sequelize
  ?.authenticate()
  .then(() => {
    console.log("Sequelize authenticated with DB");
  })
  .catch((err) => {
    console.error(`Sequelize authentication error: ${err}`);
  });

module.exports = {
  connectDB: connectWithRetry,
  disconnectDB,
};
