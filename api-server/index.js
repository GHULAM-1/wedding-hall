import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/utils/db.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// DB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
