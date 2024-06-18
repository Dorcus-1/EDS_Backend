

const { DataTypes } = require("sequelize");

const sequelize = require("../middleware/sequelize");

const Book = sequelize.define("Book", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  publicationYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
 
});

module.exports = Book;
