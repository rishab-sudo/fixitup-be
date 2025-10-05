const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyerEmail: { type: String, required: true },
  sellerEmail: { type: String, required: true },
  orderDetails: [
    {
      name: { type: String, required: true },
      count: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  addressDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
