import { Router } from "express";
import { sample_users } from "../Data.js";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    res.send(generateTokenResponse(user));
    return;
  }
  res.status(400).send("Invalid email or password");
});

const generateTokenResponse = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    "your_secret_key",
    {
      expiresIn: "30d",
    }
  );
  return {
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
    name: user.name,
    address: user.address,
    token,
  };
};

export default router;
