const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../model/UserModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN — verifies the password and returns a JWT in the response body.
// (We stopped using a cookie here: the frontend and dashboard live on
// unrelated domains, so a cross-site cookie can't be relied on — Safari
// and Firefox block it by default, and Chrome users can block it too.)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGOUT — nothing to clear server-side anymore (no cookie/session to
// invalidate); the frontend just deletes the token from its own storage.
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

// VERIFY — the dashboard calls this on load to check if its stored token is valid
router.get("/verify", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
