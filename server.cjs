const express = require("express");
const cors = require("cors");
const jsonServer = require("json-server");

const app = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

// -------------------------
// CORS
// -------------------------
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

// -------------------------
// Health Check
// -------------------------
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IT Service Desk server is running",
  });
});

// -------------------------
// Login
// -------------------------
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const users = router.db.get("users").value();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  if (user.status !== "active") {
    return res.status(403).json({
      success: false,
      message: "Your account is inactive",
    });
  }

  const { password: _, ...userWithoutPassword } = user;

  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: userWithoutPassword,
  });
});

// -------------------------
// JSON Server API
// -------------------------
// /api/users
// /api/tickets
// /api/comments
// /api/categories
// /api/activities
app.use("/api", middlewares);
app.use("/api", router);

// -------------------------
// Start Server
// -------------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`IT Service Desk server running on port ${PORT}`);
});