'use strict';
const {Model} = require('sequelize')
export default (sequelize, DataTypes) => {
  class Schools extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Schools.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    latitude:{
      type: DataTypes.DECIMAL(10,8),
      allowNull: false,
      unique: true
    },
    longitude: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Schools',
  });
  return Schools;
};