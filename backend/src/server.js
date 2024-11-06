import express from "express";
import dotenv from "dotenv";

dotenv.config();
import cors from "cors";
import FoodRouter from "./routers/food.router.js";
import UserRouter from "./routers/user.router.js";
import { dbconnect } from "./config/database.config.js";
import OrderRouter from "./routers/order.router.js";

dbconnect();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin:
      " http://localhost:5173" || "https://food-app-dusky-nine.vercel.app",
    credentials: true,
  })
);

app.use("/api/foods", FoodRouter);
app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // logs to the console when server is running
});
