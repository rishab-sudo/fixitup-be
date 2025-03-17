const { db } = require("../functions/config/db"); // Correct import

class Order {
  static async saveOrder(orderData) {
    try {
      const orderRef = db.collection("orders").doc();
      await orderRef.set(orderData);
      return orderRef.id;
    } catch (error) {
      throw new Error("Error saving order: " + error.message);
    }
  }
}

module.exports = Order;
