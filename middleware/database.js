// const mongoose  = require('mongoose');
// const MONGO_URL = process.env.MONGO_URL

// const connectDB = async (err) => {
//   if (err) return 0;
//   await mongoose.connect(MONGO_URL);
//   console.log(`MongoDB connection established`);
//   return 1;
// };
// module.exports = { connectDB };


const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, // Changed from process.env.USER to process.env.DB_USER
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});

client.connect(err => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err.stack);
    return;
  }
  console.log('Connected to PostgreSQL');
});

module.exports = client;

