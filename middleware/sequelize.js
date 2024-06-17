const { Sequelize } = require('sequelize');

// Load environment variables from a .env file (if you are using dotenv)
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432, // Default PostgreSQL port
    logging: false, // Disable logging; default: console.log
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      freezeTableName: true
    }
  }
);

module.exports = sequelize;
