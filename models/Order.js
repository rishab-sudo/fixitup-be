const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  buyerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sellerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderDetails: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Order;
