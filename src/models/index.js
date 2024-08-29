const fs = require('fs');
const path = require('path');
const process = require('process');
const { Sequelize } = require('sequelize');
const { fileURLToPath, pathToFileURL } = require('url');

const __filename = fileURLToPath(__filename);  // Update this to a compatible CommonJS method
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Load the config file
const configPath = path.join(__dirname, '/../config/config.json');
const config = require(configPath)[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import models dynamically
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && 
      file !== basename && 
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    const model = require(modelPath)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
