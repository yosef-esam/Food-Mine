import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import FoodRouter from "./routers/food.router.js";
import UserRouter from "./routers/user.router.js";
import { dbconnect } from "./config/database.config.js";
import OrderRouter from "./routers/order.router.js";
import uploadRouter from "./routers/upload.router.js";
import serverless from "serverless-http";

dotenv.config();

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

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/foods", FoodRouter);
app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/upload", uploadRouter);

// ❌ Remove this for Vercel:
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// ✅ Export the app as a serverless function for Vercel:
export const handler = serverless(app);
