const admin = require("firebase-admin");
// const serviceAccount = require("./firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fixitup-be-1b89b.firebaseio.com",
});

const db = admin.firestore();

module.exports = db;
