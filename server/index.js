const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Message = require("./models/Message");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Hello from Express backend!");
});

// 📩 POST: Create a new record
app.post("/api/message", async (req, res) => {
  try {
    const { id, name, age } = req.body;

    if (!id || !name || typeof age !== 'number') {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const newMessage = new Message({ id, name, age });
    await newMessage.save();

    res.status(201).json({ message: "Saved successfully", data: newMessage });
  } catch (err) {
    console.error("POST error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 📤 GET: Fetch all records
app.get("/api/message", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    console.error("GET error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
