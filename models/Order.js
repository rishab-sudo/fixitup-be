const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  buyerEmail: {
    type: String,
    required: true,
  },
  sellerEmail: {
    type: String,
    required: true,
  },
  orderDetails: [
    {
      name: String,
      price: Number,
      count: Number,
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  addressDetails: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
  },
});

module.exports = mongoose.model("Order", OrderSchema);