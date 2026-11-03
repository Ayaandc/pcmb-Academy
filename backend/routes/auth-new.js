const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();
const normaliseEmail = (email) => typeof email === "string" ? email.trim().toLowerCase() : "";
const publicUser = (user) => ({ id: user._id.toString(), name: user.name || user.email.split("@")[0], email: user.email, role: "STUDENT", streak: 0 });

router.post("/register", async (req, res) => {
  const email = normaliseEmail(req.body?.email);
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  if (!email || !/^\S+@\S+\.\S+$/.test(email) || password.length < 8 || name.length > 80) return res.status(400).json({ message: "Enter a valid name, email, and a password of at least 8 characters" });
  try {
    if (await User.findOne({ email })) return res.status(409).json({ message: "User already exists" });
    const user = await User.create({ email, password: await bcrypt.hash(password, 12), name: name || undefined });
    return res.status(201).json({ message: "User registered successfully", user: publicUser(user) });
  } catch (err) {
    if (err?.code === 11000) return res.status(409).json({ message: "User already exists" });
    console.error("Registration error:", err.message);
    return res.status(500).json({ message: "Unable to create your account" });
  }
});

router.post("/login", async (req, res) => {
  const email = normaliseEmail(req.body?.email);
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
  if (!process.env.JWT_SECRET) return res.status(500).json({ message: "Authentication is not configured" });
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid email or password" });
    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: "1h" });
    return res.json({ message: "Login successful", token, user: publicUser(user) });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ message: "Unable to log in right now" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");
    if (!user) return res.status(401).json({ message: "Session is no longer valid" });
    return res.json({ user: publicUser(user) });
  } catch (err) {
    console.error("Session lookup error:", err.message);
    return res.status(500).json({ message: "Unable to verify session" });
  }
});

module.exports = router;
