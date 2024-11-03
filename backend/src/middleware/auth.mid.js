import pkg from "jsonwebtoken";
const { verify } = pkg;

export default function authenticateToken(req, res, next) {
  const token = req.headers.access_token;
  if (!token) {
    return res.status(401).send();
  }
  try {
    const verified = verify(token, process.env.JWT_SECRET);
    req.user = verified;
  } catch (err) {
    res.status(401).send();
  }
  return next();
}
