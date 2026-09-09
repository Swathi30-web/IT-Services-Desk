const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

// --------------------
// CORS
// --------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://it-services-desk.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// --------------------
// Middleware
// --------------------
app.use(express.json());

// --------------------
// Health Check
// --------------------
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IT Service Desk server is running",
  });
});

// --------------------
// Test API
// --------------------
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API connection successful",
  });
});

// --------------------
// Start Server
// --------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});