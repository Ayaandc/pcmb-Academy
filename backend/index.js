require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authMiddleware = require("./Middleware/authMiddleware");
const User = require("./models/User");
const authRoutes = require("./routes/auth-new");
const aiRoutes = require("./routes/ai-new");

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const defaultAllowedOrigins = [
  "https://pcmb-academy.vercel.app",
  "http://localhost:3000",
  "http://localhost:4173",
  "http://10.21.97.144:4173",
];
const configuredOrigins = [process.env.CLIENT_ORIGIN, process.env.FRONTEND_ORIGIN]
  .filter(Boolean)
  .flatMap((origins) => origins.split(","))
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set([...defaultAllowedOrigins, ...configuredOrigins]);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error("Origin not allowed by CORS"));
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "32kb" }));

app.use("/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User profile data", user });
  } catch (error) {
    console.error("Profile route error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.use((err, req, res, next) => {
  if (err?.type === "entity.parse.failed") return res.status(400).json({ message: "Invalid JSON request body" });
  if (err?.message === "Origin not allowed by CORS") return res.status(403).json({ message: "Origin is not allowed" });
  return next(err);
});

const connectMongo = async () => {
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI is not set. Skipping MongoDB connection.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

const startServer = async () => {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is required to start the server.");
    process.exit(1);
  }
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
