require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await Admin.findOneAndUpdate(
    { email: process.env.ADMIN_EMAIL },
    { email: process.env.ADMIN_EMAIL, password: hash },
    { upsert: true }
  );
  console.log("Admin ready");
  process.exit();
})();