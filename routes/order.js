const express = require("express");
const nodemailer = require("nodemailer");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const router = express.Router();

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require("../config/firebaseServiceAccountKey.json")),
  });
}

const db = getFirestore();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send-order-confirmation", async (req, res) => {
  const { buyerEmail, sellerEmail, orderDetails, totalPrice, addressDetails } = req.body;
  console.log(
    "buyerEmail", buyerEmail,
    "sellerEmail", sellerEmail,
    "orderDetails", orderDetails,
    "totalPrice", totalPrice,
    "addressDetails", addressDetails
  );

  // Define the email contents
  const buyerEmailContent = `
    <h3>Order Confirmation</h3>
    <p>Thank you for your purchase!</p>
    <ul>${orderDetails.map(item => `<li>${item.name} (*${item.count}): ₹${item.price * item.count}</li>`).join("")}</ul>
    <p><strong>Total Price:</strong> ₹${totalPrice}</p>
    <h4>Delivery Address:</h4>
    <p>${addressDetails.name}, ${addressDetails.address}, ${addressDetails.city}, ${addressDetails.state}, ${addressDetails.zipCode}, Phone: ${addressDetails.phone}</p>
  `;

  const sellerEmailContent = `
    <h3>New Order Received</h3>
    <ul>${orderDetails.map(item => `<li>${item.name} (x${item.count}): ₹${item.price * item.count}</li>`).join("")}</ul>
    <p><strong>Total Price:</strong> ₹${totalPrice}</p>
    <h4>Delivery Address:</h4>
    <p>${addressDetails.name}, ${addressDetails.address}, ${addressDetails.city}, ${addressDetails.state}, ${addressDetails.zipCode}, Phone: ${addressDetails.phone}</p>
  `;

  try {
    // Save order to Firestore
    await db.collection("orders").add({
      buyerEmail,
      sellerEmail,
      orderDetails,
      totalPrice,
      addressDetails,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

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
    console.error("Error:", error);
    res.status(500).send("Failed to process order");
  }
});

module.exports = router;