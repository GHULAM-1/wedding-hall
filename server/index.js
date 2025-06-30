require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Mongoose model
const User = require("./models/Users");

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// -------------------- CRUD Routes -------------------- //

// 📤 GET all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().sort({ timestamp: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// 🔍 GET specific user by MongoDB _id
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// ➕ POST: Create new user
app.post("/api/users", async (req, res) => {
  try {
    const { name, age } = req.body;

    if (!name || typeof age !== "number") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const newUser = new User({ name, age });
    await newUser.save();

    res.status(201).json({ message: "User saved", data: newUser });
  } catch (err) {
    res.status(500).json({ error: "Error saving user" });
  }
});

// ✏️ PUT: Update user
app.put("/api/users/:id", async (req, res) => {
  try {
    const { name, age } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, age },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User updated", data: updatedUser });
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
});

// ❌ DELETE: Remove user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted", data: deletedUser });
  } catch (err) {
    res.status(400).json({ error: "Delete failed" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});



