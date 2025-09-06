import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./router/userRouter.js";
import postRouter from "./router/postRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Normalize FRONTEND origin (remove trailing slash)
const rawFrontend = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const FRONTEND = rawFrontend.replace(/\/+$/, "");

// Allowed origins array (expand if you have more domains)
const allowedOrigins = [FRONTEND];

// Headers your clients may send — include both lower/upper-case variants to be safe
const allowedHeaders = [
  "Content-Type",
  "Authorization",
  "X-Auth-Token",
  "x-auth-token",
  "X-Requested-With",
  "Accept",
  "Origin"
];

app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    // allow requests from non-browser clients (no origin) like curl/postman
    if (!origin) return callback(null, true);
    const normalizedOrigin = origin.replace(/\/+$/, "");
    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: allowedHeaders
}));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_DB_CLOUD_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
