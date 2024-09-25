import express from "express";
import cors from "cors";
import FoodRouter from "./routers/food.router.js";
import UserRouter from "./routers/user.router.js";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/foods", FoodRouter);
app.use("/api/users", UserRouter);
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // logs to the console when server is running
});
