const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

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

app.use(express.json());

// Health
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "IT Service Desk server is running",
  });
});

// Users
app.get("/api/users", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Admin",
      email: "admin@gmail.com",
      role: "admin",
    },
    {
      id: 2,
      name: "User",
      email: "user@gmail.com",
      role: "user",
    },
  ]);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});