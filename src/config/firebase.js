const admin = require("firebase-admin");
const serviceAccount = require("../../ve-project-ec7de-firebase-adminsdk-fbsvc-82be964c7d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Correct storage bucket
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };
