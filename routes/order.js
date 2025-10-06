const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const Order = require("../models/Order"); // Import the Order model

// Email configuration using Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send-order-confirmation", async (req, res) => {
  const { buyerEmail, sellerEmail, orderDetails, totalPrice, addressDetails } = req.body;

  const buyerEmailContent = `
    <h3>Order Confirmation</h3>
    <p>Thank you for your purchase!</p>
    <ul>
      ${orderDetails
        .map(
          (item) =>
            `<li>${item.name} (x${item.count}): ₹${item.price * item.count}</li>`
        )
        .join("")}
    </ul>
    <p><strong>Total Price:</strong> ₹${totalPrice}</p>
    <p><strong>Delivery Address:</strong><br>
    ${addressDetails.name}, ${addressDetails.address}, ${addressDetails.city}, 
    ${addressDetails.state}, ${addressDetails.zipCode}<br>
    Phone: ${addressDetails.phone}</p>
  `;

  const sellerEmailContent = `
    <h3>New Order Received</h3>
    <ul>
      ${orderDetails
        .map(
          (item) =>
            `<li>${item.name} (x${item.count}): ₹${item.price * item.count}</li>`
        )
        .join("")}
    </ul>
    <p><strong>Total Price:</strong> ₹${totalPrice}</p>
    <p><strong>Customer:</strong><br>
    ${addressDetails.name}, ${addressDetails.address}, ${addressDetails.city}, 
    ${addressDetails.state}, ${addressDetails.zipCode}<br>
    Phone: ${addressDetails.phone}</p>
  `;

  try {
    // Save order first (blocking until done)
    const order = new Order({
      buyerEmail,
      sellerEmail,
      orderDetails,
      totalPrice,
      addressDetails,
    });
    await order.save();

    // Send response immediately after saving
    res.status(200).send("Order saved successfully, emails will be sent shortly");

    // Send emails in background (non-blocking)
    Promise.all([
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: buyerEmail,
        subject: "Order Confirmation",
        html: buyerEmailContent,
      }),
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: sellerEmail,
        subject: "New Order Received",
        html: sellerEmailContent,
      }),
    ])
      .then(() => console.log("Emails sent successfully"))
      .catch((err) => console.error("Error sending emails:", err));

  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send("Failed to save order");
  }
});



module.exports = router;
