/**
 * Firebase Volunteer User Provisioning Script
 * -------------------------------------------
 * Usage:
 *   1. Download your Firebase Admin service account key JSON and save as serviceAccountKey.json
 *   2. Run: node scripts/seed-volunteers-firebase.js
 *
 * This script batch-creates student accounts in Firebase Authentication using their
 * Digital ID / college email and sets their initial default password to their Date of Birth (DDMMYYYY).
 * It also initializes a document in Firestore with { mustChangePassword: true, digitalId: ... }.
 */

const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

const SERVICE_ACCOUNT_PATH = path.join(__dirname, "serviceAccountKey.json");
const COLLEGE_DOMAIN = process.env.REACT_APP_COLLEGE_DOMAIN || "ssn.edu.in";

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error("❌ Service account key not found at:", SERVICE_ACCOUNT_PATH);
  console.error("Please place your Firebase serviceAccountKey.json in the scripts/ folder to run batch provisioning.");
  process.exit(1);
}

const serviceAccount = require(SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();

// Sample list of volunteers to provision (replace with CSV parser or Google Sheet sync)
const sampleVolunteers = [
  {
    digitalId: "2311234",
    name: "Sample Volunteer",
    dob: "15082004", // DDMMYYYY format
    dept: "CSE"
  }
];

async function provisionVolunteers(volunteers) {
  console.log(`🚀 Starting provisioning for ${volunteers.length} volunteer(s)...`);

  for (const vol of volunteers) {
    const email = `${vol.digitalId}@${COLLEGE_DOMAIN}`;
    const defaultPassword = vol.dob; // DOB DDMMYYYY

    try {
      let userRecord;
      try {
        userRecord = await auth.getUserByEmail(email);
        console.log(`ℹ️ User already exists in Auth: ${email} (${userRecord.uid})`);
      } catch (err) {
        if (err.code === "auth/user-not-found") {
          userRecord = await auth.createUser({
            email: email,
            password: defaultPassword,
            displayName: vol.name
          });
          console.log(`✅ Created Auth user: ${email}`);
        } else {
          throw err;
        }
      }

      // Record in Firestore with mustChangePassword flag
      await db.collection("users").doc(userRecord.uid).set(
        {
          digitalId: vol.digitalId,
          name: vol.name,
          dept: vol.dept,
          email: email,
          mustChangePassword: true,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );

      console.log(`✅ Firestore record synced for ${vol.digitalId}`);
    } catch (error) {
      console.error(`❌ Failed to provision ${vol.digitalId}:`, error.message);
    }
  }

  console.log("🎉 Provisioning completed.");
}

provisionVolunteers(sampleVolunteers);
