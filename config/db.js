const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Adjust based on your requirements
  },
});

module.exports = sequelize;
