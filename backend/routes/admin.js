import express from "express";
import Admin from "../models/Admin.js"; // correct path

const router = express.Router();

// ----------------- Add Admin -----------------
router.post("/add", async (req, res) => {
  let { name, email } = req.body;

  if (!name || !email) return res.status(400).json({ msg: "Name and email required" });

  name = name.trim();
  email = email.trim();

  try {
    const existingAdmin = await Admin.findOne({ email: { $regex: `^${email}$`, $options: "i" } });

    if (existingAdmin) return res.status(400).json({ msg: "Admin already exists" });

    const newAdmin = new Admin({ name, email });
    await newAdmin.save();

    res.json({ msg: "Admin added successfully", admin: newAdmin });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ----------------- Admin Login -----------------
router.post("/login", async (req, res) => {
  let { name, email } = req.body;

  if (!name || !email) return res.status(400).json({ msg: "Please provide name and email" });

  name = name.trim();
  email = email.trim();

  try {
    const admin = await Admin.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
      email: { $regex: `^${email}$`, $options: "i" },
    });

    if (!admin) return res.status(400).json({ msg: "Invalid admin details" });

    res.json({ admin });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
