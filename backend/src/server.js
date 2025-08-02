import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
import cors from "cors";
import FoodRouter from "./routers/food.router.js";
import UserRouter from "./routers/user.router.js";
import { dbconnect } from "./config/database.config.js";
import OrderRouter from "./routers/order.router.js";
import uploadRouter from "./routers/upload.router.js";

dbconnect();
const app = express();
app.use(express.json());

// Define your allowed origins
const allowedOrigins = [
  "http://localhost:5173", // For your local development on port 1573
  "https://food-app-client-kappa.vercel.app", // For your Vercel deployed client
];

// Configure CORS to allow multiple origins
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      // This is often needed for server-to-server requests or if you have
      // clients that don't send an Origin header (e.g., some desktop apps).
      if (!origin) return callback(null, true);

      // Check if the incoming origin is in our allowedOrigins list
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/foods", FoodRouter);
app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/upload", uploadRouter);

const port = 5000; // Your backend will run on port 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // logs to the console when server is running
});
