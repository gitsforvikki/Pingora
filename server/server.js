import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./router/userRouter.js";
import postRouter from "./router/postRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const FRONTEND = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

app.use(express.json());
app.use(cors({
  origin: FRONTEND,
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
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
