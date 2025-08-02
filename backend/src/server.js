import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import fs from "fs";
import FoodRouter from "./routers/food.router.js";
import UserRouter from "./routers/user.router.js";
import { dbconnect } from "./config/database.config.js";
import OrderRouter from "./routers/order.router.js";
import uploadRouter from "./routers/upload.router.js";
import serverless from "serverless-http";

dotenv.config();

// Initialize database connection
dbconnect();

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://food-hub-rho-silk.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error(`CORS blocked for ${origin}`), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from uploads directory
app.use("/uploads", express.static(uploadsDir));

// API Routes
app.use("/api/foods", FoodRouter);
app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/upload", uploadRouter);

// Health check endpoint for Vercel
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "Food App Backend API",
    version: "1.0.0",
    status: "running"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ 
    error: "Internal Server Error",
    message: err.message 
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ 
    error: "Not Found",
    message: "Route not found" 
  });
});

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Export the app as a serverless function for Vercel
export const handler = serverless(app);
