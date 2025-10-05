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
  const { buyerEmail, sellerEmail, orderDetails, totalPrice, addressDetails } =
    req.body;
  console.log(
    "buyerEmail",
    buyerEmail, 
    "sellerEmail",
    sellerEmail,
    "orderDetails",
    orderDetails,
    "totalPrice",
    totalPrice,
    "addressDetails",
    addressDetails
  );

  // Define the email contents
  const buyerEmailContent = `
      <h3>Order Confirmation</h3>
      <p>Thank you for your purchase!</p>
      <p>Order Summary:</p>
      <ul>
        ${orderDetails
          .map(
            (item) =>
              `<li>Product Name: ${item.name} (Quantity: ${
                item.count
              }): Price: ₹${item.price * item.count}</li>`
          )
          .join("")}
      </ul>
      <p><strong>Total Price:</strong> ₹${totalPrice}</p>
      <h4><strong>Delivery Address:</strong></h4>
      <p><strong>Name:</strong> ${addressDetails.name}</p>
      <p><strong>Address:</strong> ${addressDetails.address}</p>
      <p><strong>City/Pincode:</strong> ${addressDetails.city}, ${
    addressDetails.state
  }, ${addressDetails.zipCode}</p>
      <p><strong>Phone No:</strong> ${addressDetails.phone}</p>
    `;

  const sellerEmailContent = `
      <h3>New Order Received</h3>
      <p>A new order has been placed with the following details:</p>
      <ul>
        ${orderDetails
          .map(
            (item) =>
              // `<li>${item.name} (x${item.count}): ₹${item.price * item.count}</li>`
              `<li>Product Name: ${item.name} (Quantity: ${
                item.count
              }): Price: ₹${item.price * item.count}</li>`
          )
          .join("")}
      </ul>
      <p><strong>Total Price:</strong> ₹${totalPrice}</p>
      <h4><strong>Delivery Address:</h4>
      <p><strong>Customer Name:</strong> ${addressDetails.name}</p>
      <p><strong>Address:</strong> ${addressDetails.address}</p>
      <p><strong>City/Pincode:</strong> ${addressDetails.city}, ${
    addressDetails.state
  }, ${addressDetails.zipCode}</p>
      <p><strong>Phone No:</strong> ${addressDetails.phone}</p>
    `;

  try {
    const order = new Order({
      buyerEmail,
      sellerEmail,
      orderDetails,
      totalPrice,
      addressDetails,
    });
    await order.save();

    // Send email to buyer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: buyerEmail,
      subject: "Order Confirmation",
      html: buyerEmailContent,
    });

    // Send email to seller
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: sellerEmail,
      subject: "New Order Received",
      html: sellerEmailContent,
    });

    res.status(200).send("Emails sent and order saved successfully");
  } catch (error) {
    console.error("Error sending emails or saving order:", error);
    res.status(500).send("Failed to send emails or save order");
  }
});


module.exports = router;
