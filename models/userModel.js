
const { DataTypes, Model } = require("sequelize");
const jwt = require("jsonwebtoken");
const sequelize = require("../middleware/sequelize");

class User extends Model {
  async generateAuthToken() {
    const token = jwt.sign({ id: this.id }, process.env.SECRET, {
      expiresIn: "1h"
    });
    return token;
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstName: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: { 
      type: DataTypes.STRING,
      allowNull: false},
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
  },
  {
    sequelize,
    modelName: "User"
  }
);

module.exports = User;
