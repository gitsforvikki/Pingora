import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_DB_CLOUD_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
import userRouter from "./router/userRouter.js";
app.use("/api/users", userRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
