const User = require("../models/User");

async function ensureAdmin() {
  const email = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log("Admin seed skipped: ADMIN_EMAIL or ADMIN_PASSWORD missing.");
    return;
  }

  const existing = await User.findOne({ email });

  if (existing) {
    if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
      console.log(`Existing user promoted to admin: ${email}`);
    }
    return;
  }

  await User.create({
    name: process.env.ADMIN_NAME || "Laxmi Construction Admin",
    email,
    password,
    phone: "",
    role: "admin",
    status: "active",
    emailVerified: true
  });

  console.log(`Admin account created: ${email}`);
}

module.exports = { ensureAdmin };
