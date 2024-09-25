import { Router } from "express";
import { sample_food, sample_tags } from "../Data.js";

const router = Router();

router.get("/", (req, res) => {
  res.send(sample_food);
});

router.get("/tags", (req, res) => {
  res.send(sample_tags);
});

router.get("/search/:searchTerm", (req, res) => {
  const { searchTerm } = req.params;
  const foods = sample_food.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  res.send(foods);
});

router.get("/:foodId", (req, res) => {
  const { foodId } = req.params;
  const food = sample_food.find((item) => item.id === parseInt(foodId));
  res.send(food);
});

router.get("/tags/:tag", (req, res) => {
  const { tag } = req.params;
  const foods = sample_food.filter((item) => item.tag.includes(tag));
  console.log("foods is " + foods);
  res.send(foods);
});

export default router;
