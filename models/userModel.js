// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
 
// });

// userSchema.methods.generateAuthToken = async function () {
//   const token = await jwt.sign({ _id: this._id }, process.env.SECRET);
//   return token;
// };

// module.exports.userModel = mongoose.model("User", userSchema);


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
